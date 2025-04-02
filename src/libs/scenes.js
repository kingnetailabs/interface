import "@babylonjs/loaders";
import * as BABYLON from "@babylonjs/core/Legacy/legacy"; 
import { base64ToBuffer } from "./base64s";
const model = "player4.glb";

let dirLight, hemiLight;
let engine, scene, camera;
let idle1, idle2, idle3;
let observer1, observer2, observer3;
let istalking, talking1, talking2, talking3;
let currentSpeech, myAnalyser;
let animationsGLB = [];
let currentAnimation;
let animationOffset = 50;
var leftEye, rightEye;
var morphMultiplier_1 = 0.65;
var morphMultiplier_2 = 1;
var callbackFn;
var salute;

function createPlayerScene(canvas, modelUrl, rootBox, is2D, callback) {
  console.log(":", modelUrl, rootBox, is2D, callback);
  callbackFn = callback;
  if (is2D) {
  } else {
    console.log("====================babylon================");
    engine = new BABYLON.Engine(canvas, true, { stencil: false, audioEngine: true }, true);
    engine.clear(new BABYLON.Color3(0, 0, 0), true, true);

    scene = new BABYLON.Scene(engine);
    // 设置背景颜色
    scene.clearColor = BABYLON.Color4.FromHexString("#191225");
    camera = new BABYLON.ArcRotateCamera(
      "Camera",
      0,
      0,
      0,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );

    startGame(modelUrl + "?morphTargets=ARKit&lod=1&textureFormat=webp");
    return scene;
  }
}

function startGame(modelUrl) {
  var toRender = function () {
    scene.render();
  };
  engine.runRenderLoop(toRender);
  engine.clear(new BABYLON.Color3(0, 0, 0), true, true);


  dirLight = new BABYLON.DirectionalLight(
    "dirLight",
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  hemiLight = new BABYLON.HemisphericLight(
    "hemiLight",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  // Hemispheric Light
  hemiLight.intensity = 0.15;

  // Directional Light
  dirLight.intensity = 1.75;
  dirLight.position = new BABYLON.Vector3(0, 30, 10);
  dirLight.direction = new BABYLON.Vector3(-2, -7, -5);
  dirLight.shadowMinZ = -100;
  dirLight.shadowMaxZ = 100;

  // Create Lights Transform Node
  var lightsNode = new BABYLON.TransformNode("_Lights_", scene);
  hemiLight.parent = lightsNode;
  dirLight.parent = lightsNode;

  importAnimationsAndModel(modelUrl);
  speekAudio();
}

function speekAudio() {
  // setTimeout(() => {
  startTimeline();
  // }, 400);
}

const importModel = (modelUrl) => {
  return (
    BABYLON.SceneLoader.ImportMeshAsync(null, modelUrl, "", scene)
      //   return BABYLON.SceneLoader.ImportMeshAsync(null, modelPath, model, scene)
      .then((result) => {
        createCamera();
        const player = result.meshes[0];
        player.name = "_Character_";
        // shadowGenerator.addShadowCaster(result.meshes[0]);
        const modelTransformNodes = player.getChildTransformNodes();
        animationsGLB.forEach((animation) => {
          const modelAnimationGroup = animation.clone(
            model.replace(".glb", "_") + animation.name,
            (oldTarget) => {
              return modelTransformNodes.find(
                (node) => node.name === oldTarget.name
              );
            }
          );
          animation.dispose();
        });

        // Clean Imported Animations
        animationsGLB = [];

        // Setup Idle Anims
        const modelName = model
          .substring(model.lastIndexOf("/") + 1)
          .replace(".glb", "");
        idle1 = scene.getAnimationGroupByName(
          modelName + "_M_Standing_Idle_Variations_001"
        );
        idle2 = scene.getAnimationGroupByName(
          modelName + "_M_Standing_Idle_Variations_002"
        );
        idle3 = scene.getAnimationGroupByName(
          modelName + "_M_Standing_Idle_Variations_003"
        );

        talking1 = scene.getAnimationGroupByName(
          modelName + "_M_Talking_Variations_006"
        );
        talking2 = scene.getAnimationGroupByName(
          modelName + "_M_Talking_Variations_005"
        );
        talking3 = scene.getAnimationGroupByName(
          modelName + "_M_Talking_Variations_007"
        );
        salute = scene.getAnimationGroupByName(
          modelName + "_M_Standing_Expressions_013"
        );

        // Current Anim
        currentAnimation = idle1;
        idle1.play(false);

        setIdleAnimObservers();

        // setReflections();
        // setShadows();
        currentAnimation = scene.animationGroups[0];
        // showButtonHide();

        leftEye = scene
          .getMeshByName("Wolf3D_Head")
          .morphTargetManager.getTarget(50);
        rightEye = scene
          .getMeshByName("Wolf3D_Head")
          .morphTargetManager.getTarget(51);

        // console.log(scene.getMeshByName("Wolf3D_Head").morphTargetManager);

        // // Setup Init Jaw Forward
        scene
          .getMeshByName("Wolf3D_Head")
          .morphTargetManager.getTarget(9).influence = 0.4;

        // Animate Face Morphs
        animateFaceMorphs();
      })
  );
};

function createCamera() {
  scene.createDefaultCameraOrLight(true, true, true);
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 1)
  );

  light.intensity = 1;

  light.diffuse = new BABYLON.Color3(1, 1, 1);
  light.specular = new BABYLON.Color3(1, 1, 1);

  scene.activeCamera.alpha = 1.57;
  scene.activeCamera.beta = 1.42;
  scene.activeCamera.radius = 18;

  scene.activeCamera.setPosition(new BABYLON.Vector3(20, 4.32, 100));
  scene.activeCamera.setTarget(new BABYLON.Vector3(0, 0.95, 0));

  scene.activeCamera.upperBetaLimit = Math.PI * 0.5;
  scene.activeCamera.lowerBetaLimit = 0;

  scene.activeCamera.upperRadiusLimit = 2.5;

  scene.activeCamera.wheelPrecision = 250;

  scene.activeCamera.panningSensibility = 2000;

  scene.activeCamera.storeState();
}

async function importAnimationsAndModel(modelUrl) {
  const animationPromises = [
    importAnimations("masculine/idle/M_Standing_Idle_Variations_001.glb"),
    importAnimations("masculine/idle/M_Standing_Idle_Variations_002.glb"),
    importAnimations("masculine/idle/M_Standing_Idle_Variations_003.glb"),
    importAnimations("masculine/expression/M_Standing_Expressions_013.glb"),
    importAnimations("masculine/expression/M_Talking_Variations_005.glb"),
    importAnimations("masculine/expression/M_Talking_Variations_006.glb"),
    importAnimations("masculine/expression/M_Talking_Variations_007.glb"),
  ];

  await Promise.all(animationPromises);
  importModel(modelUrl);
}

function importAnimations(animation) {
  return BABYLON.SceneLoader.ImportMeshAsync(
    null,
    "/models/animations/" + animation,
    null,
    scene
  ).then((result) => {
    result.meshes.forEach((element) => {
      if (element) {
        element.dispose();
      }
    });
    console.log("result.animationGroups", result.animationGroups);
    animationsGLB.push(result.animationGroups[0]);
  });
}

// Setup Idle Animation OnEnd Observers
function setIdleAnimObservers() {
  observer1 = idle1.onAnimationEndObservable.add(function () {
    scene.onBeforeRenderObservable.runCoroutineAsync(
      animationBlending(idle1, 0.8, idle2, 0.8, false, 0.02)
    );
  });
  observer2 = idle2.onAnimationEndObservable.add(function () {
    scene.onBeforeRenderObservable.runCoroutineAsync(
      animationBlending(idle2, 0.8, idle3, 0.8, false, 0.02)
    );
  });
  observer3 = idle3.onAnimationEndObservable.add(function () {
    scene.onBeforeRenderObservable.runCoroutineAsync(
      animationBlending(idle3, 0.8, idle1, 0.8, false, 0.02)
    );
  });
}

// Animate Eyes
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function animateFaceMorphs() {
  const mesh = scene.getMeshByName("Wolf3D_Head");
  const getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  // Animate Eyes
  const animateEyes = async () => {
    const randomNumber = getRandomNumber(1, 2);
    if (randomNumber === 1) {
      leftEye.influence = 1;
      rightEye.influence = 1;
      await wait(500);
      leftEye.influence = 0;
      rightEye.influence = 0;
      const randomNumber2 = getRandomNumber(1, 2);
      if (randomNumber2 === 1) {
        await wait(500);
        leftEye.influence = 1;
        rightEye.influence = 1;
        await wait(500);
        leftEye.influence = 0;
        rightEye.influence = 0;
      }
    }
  };

  // animateMorphTarget registerBeforeRender
  const animateMorphTarget = (
    targetIndex,
    initialValue,
    targetValue,
    numSteps
  ) => {
    let currentStep = 0;
    const morphTarget = mesh.morphTargetManager.getTarget(targetIndex);

    const animationCallback = () => {
      currentStep++;
      const t = currentStep / numSteps;
      morphTarget.influence = BABYLON.Scalar.Lerp(initialValue, targetValue, t);
      if (currentStep >= numSteps) {
        scene.unregisterBeforeRender(animationCallback);
      }
    };

    scene.registerBeforeRender(animationCallback);
  };

  // Brows
  const animateBrow = () => {
    const random = Math.random() * 0.8;
    const initialValue = mesh.morphTargetManager.getTarget(2).influence;
    const targetValue = random;
    animateMorphTarget(2, initialValue, targetValue, 15);
    animateMorphTarget(3, initialValue, targetValue, 15);
    animateMorphTarget(4, initialValue, targetValue, 15);
  };

  // Smile
  const animateSmile = () => {
    const random = Math.random() * 0.18 + 0.02;
    const initialValue = mesh.morphTargetManager.getTarget(47).influence;
    const targetValue = random;
    animateMorphTarget(47, initialValue, targetValue, 30);
    animateMorphTarget(48, initialValue, targetValue, 30);
  };

  // Mouth Left / Right
  const animateMouthLeftRight = () => {
    const random1 = Math.random() * 0.7;
    const randomLeftOrRight = getRandomNumber(0, 1);
    const targetIndex = randomLeftOrRight === 1 ? 22 : 21;
    const initialValue =
      mesh.morphTargetManager.getTarget(targetIndex).influence;
    const targetValue = random1;
    animateMorphTarget(targetIndex, initialValue, targetValue, 90);
  };

  // Nose
  const animateNose = () => {
    const random = Math.random() * 0.7;
    const initialValue = mesh.morphTargetManager.getTarget(17).influence;
    const targetValue = random;
    animateMorphTarget(17, initialValue, targetValue, 60);
    animateMorphTarget(18, initialValue, targetValue, 60);
  };

  // Jaw Forward
  const animateJawForward = () => {
    const random = Math.random() * 0.5;
    const initialValue = mesh.morphTargetManager.getTarget(9).influence;
    const targetValue = random;
    animateMorphTarget(9, initialValue, targetValue, 60);
  };

  // Cheeks
  const animateCheeks = () => {
    const random = Math.random() * 1;
    const initialValue = mesh.morphTargetManager.getTarget(32).influence;
    const targetValue = random;
    animateMorphTarget(32, initialValue, targetValue, 60);
    animateMorphTarget(33, initialValue, targetValue, 60);
  };

  setInterval(animateEyes, 800);
  setInterval(animateBrow, 1200);
  setInterval(animateSmile, 2000);
  setInterval(animateMouthLeftRight, 1500);
  setInterval(animateNose, 1000);
  setInterval(animateJawForward, 2000);
  setInterval(animateCheeks, 1200);
}

// Animation Blending
function* animationBlending(
  fromAnim,
  fromAnimSpeedRatio,
  toAnim,
  toAnimSpeedRatio,
  repeat,
  speed,
  toAnimFrameIn,
  toAnimFrameOut,
  maxWeight
) {
  if (!toAnimFrameIn) toAnimFrameIn = 0;
  if (!toAnimFrameOut) toAnimFrameOut = toAnim.duration;
  if (!maxWeight) maxWeight = 1;

  let currentWeight = 1;
  let newWeight = 0;
  fromAnim.stop();
  toAnim.start(repeat, toAnimSpeedRatio, toAnimFrameIn, toAnimFrameOut, false);
  fromAnim.speedRatio = fromAnimSpeedRatio;
  toAnim.speedRatio = toAnimSpeedRatio;
  while (newWeight < maxWeight) {
    newWeight += speed;
    currentWeight -= speed;
    toAnim.setWeightForAllAnimatables(newWeight);
    fromAnim.setWeightForAllAnimatables(currentWeight);
    yield;
  }
  currentAnimation = toAnim;
}

// Remove Idle Animation OnEnd Observers
function removeAnimObservers() {
  idle1.onAnimationEndObservable.remove(observer1);
  idle2.onAnimationEndObservable.remove(observer2);
  idle3.onAnimationEndObservable.remove(observer3);
  idle1.stop();
  idle2.stop();
  idle3.stop();
}

// Start Timeline
let msgQueuePushInterval;
let isRegisterBeforeRender;

async function startTimeline() {
  const animationDuration = 250;
  camera.alpha = 1.57;
  camera.beta = 1.42;
  BABYLON.Animation.CreateAndStartAnimation(
    "cameraAnim",
    camera,
    "radius",
    50,
    animationDuration,
    15,
    2.4,
    BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE,
    undefined,
    () => {
      camera.useAutoRotationBehavior = true;
      camera.autoRotationBehavior.idleRotationSpeed = 0.025;
    }
  );

  // startPlay();
}

function startPlay() {
  clearInterval(msgQueuePushInterval);

  msgQueuePushInterval = setInterval(async () => {
    startSpeech();
    talkingAnim();
  }, 1000);
}

function startSpeech() {
  if (istalking) {
    console.log("istalking");
    return;
  }
}

const createSpeech = async function (message) {
  if (!message || message.length == 0) return;

  try {
    console.log("createSpeech begin");

    const base64String = "data:audio/mp3;base64," + message;
    let buff = await base64ToBuffer(base64String);
    let speech = new BABYLON.Sound("FromArrayBuffer", buff, scene, () => {
      speech.volume = 1;
      speech.play();
      istalking = true;
    });

    currentSpeech = speech;
    const speechTrack = new BABYLON.SoundTrack(scene);
    speechTrack.addSound(speech);

    myAnalyser = new BABYLON.Analyser(scene);
    speechTrack.connectToAnalyser(myAnalyser);
    myAnalyser.FFT_SIZE = 64;
    myAnalyser.SMOOTHING = 0.03;
    speech.onEndedObservable.add(() => {
      console.log("createSpeech end");
      istalking = false;
      startSpeech();
    });
  } catch (err) {
    console.log("createSpeech end err", err);
    istalking = false;
    startSpeech();
  }
};

// 检查音频文件
async function checkAudio(message) {
  return new Promise((resolve, reject) => {
    const base64String = "data:audio/mp3;base64," + message;
    base64ToBuffer(base64String).then((buff) => {
      const audioCtx = new window.AudioContext();
      audioCtx.decodeAudioData(
        buff,
        () => {
          resolve();
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
}

export const createSpeech2 = function (message, is2D) {
  if (is2D) {
    // return createSpeech2D(message)
  }
  if (!message || message.length === 0) return Promise.resolve();

  return new Promise((resolve, reject) => {
    checkAudio(message).catch((err) => {
      reject(err);
    });

    const base64String = "data:audio/mp3;base64," + message;
    base64ToBuffer(base64String)
      .then((buff) => {
        let speech = new BABYLON.Sound("FromArrayBuffer", buff, scene, () => {
          speech.volume = 1;
          speech.play();
          istalking = true;
        });

        currentSpeech = speech;
        const speechTrack = new BABYLON.SoundTrack(scene);
        speechTrack.addSound(speech);

        myAnalyser = new BABYLON.Analyser(scene);
        speechTrack.connectToAnalyser(myAnalyser);
        myAnalyser.FFT_SIZE = 64;
        myAnalyser.SMOOTHING = 0.03;

        speech.onEndedObservable.addOnce(() => {
          console.log("createSpeech end");
          istalking = false;
          // startSpeech();
          resolve(); 
        });
      })
      .catch((err) => {
        console.log("createSpeech end err", err);
        istalking = false;
        // startSpeech();
        reject(err);
      });
  });
};

function talkingAnim() {
  if (myAnalyser && !isRegisterBeforeRender) {
    scene.registerBeforeRender(function () {
      const workingArray = myAnalyser.getByteFrequencyData();
      let jawValue = 0;

      if (istalking) {
        // console.log("Frequency: " + workingArray[5] / 512);
        jawValue = (workingArray[5] / 512) * morphMultiplier_1;
      }

      scene
        .getMeshByName("Wolf3D_Head")
        .morphTargetManager.getTarget(16).influence = jawValue * 2;
      scene
        .getMeshByName("Wolf3D_Head")
        .morphTargetManager.getTarget(34).influence = jawValue;
      scene
        .getMeshByName("Wolf3D_Teeth")
        .morphTargetManager.getTarget(34).influence = jawValue;
      isRegisterBeforeRender = true;
    });
  }

  if (istalking && !currentAnimation.isPlaying) {
    let newTalkingAnim;
    do {
      const random2 = Math.floor(Math.random() * 3) + 1;
      if (random2 === 1) newTalkingAnim = talking1;
      else if (random2 === 2) newTalkingAnim = talking2;
      else if (random2 === 3) newTalkingAnim = talking3;
    } while (newTalkingAnim === currentAnimation);
    scene.onBeforeRenderObservable.runCoroutineAsync(
      animationBlending(
        currentAnimation,
        0.8,
        newTalkingAnim,
        0.8,
        false,
        0.02,
        animationOffset,
        newTalkingAnim.duration - animationOffset,
        0.75
      )
    );
  }
}

async function soundPause() {
  if (currentSpeech && !currentSpeech.paused) {
    currentSpeech.pause();
    currentSpeech.currentTime = 0;
  }
}

async function soundPlay() {
  if (currentSpeech && currentSpeech.paused) {
    currentSpeech.pause();
  }
}

async function soundStop() {
  console.log("soundStop");
  // soundStop2()
  if (currentSpeech && !currentSpeech.stop) {
    currentSpeech.stop();
    currentSpeech.currentTime = 0;
  }
  // recognition = null
}

export function setRecognition(r) {
  // recognition = r;
}

export function isTalkEnd() {
  console.log("talking", istalking);
  return !istalking;
}

export function destroyPlayerScene() {
  // destroyLive2DScene()
  if (!msgQueuePushInterval) return;
  clearInterval(msgQueuePushInterval);
}

export { createPlayerScene, soundPause, soundStop, soundPlay };

// import { Engine, Scene, SceneLoader, FreeCamera, Vector3, ArcRotateCamera, MeshBuilder, StandardMaterial, Color3, HemisphericLight } from "@babylonjs/core";
import "@babylonjs/loaders";
import * as BABYLON from "@babylonjs/core/Legacy/legacy"; 
import { tts } from "@/api/ai";
import { useMain } from "@/store";
import { msgQueue } from "./queue";
import { emitter } from "./EventEmitter";
import axios from "axios";

const store = useMain();
const model = "player4.glb";
const modelPath = "/models/";

let salute;
let dirLight, hemiLight;
let engine, scene, camera;
let idle1, idle2, idle3;
let observer1, observer2, observer3;
let talking, talking1, talking2, talking3;
let speech, myAnalyser;
let animationsGLB = [];
let currentAnimation;
let animationOffset = 50;
let soundFromBuffer;
var leftEye, rightEye;
var morphMultiplier_1 = 0.65;
var morphMultiplier_2 = 1;
var recognition;

async function createPlayerScene(canvas, modelUrl, meshs) {
  engine = new BABYLON.Engine(canvas, true, { stencil: false }, true);
  engine.clear(new BABYLON.Color3(0, 0, 0), true, true);
  // engine.clear(new BABYLON.Color4(0.7, 0.8, 0.9, 1.0));

  scene = new BABYLON.Scene(engine);
  // 设置背景颜色
  scene.clearColor = BABYLON.Color4.FromHexString("#191225");
  // scene.clearColor = BABYLON.Color4.FromHexString("#ffffff")
  camera = new BABYLON.ArcRotateCamera(
    "Camera",
    0,
    0,
    0,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );

  // modelUrl = '/models/player.glb'
  startGame(modelUrl + "?morphTargets=ARKit&lod=1&textureFormat=webp", meshs);
  // startGame(modelUrl+'', meshs);

  return scene;
}

function startGame(modelUrl, meshs) {
  console.log("meshs", meshs);
  var toRender = function () {
    scene.render();
  };
  engine.runRenderLoop(toRender);
  engine.clear(new BABYLON.Color3(0, 0, 0), true, true);

  // myAnalyser.drawDebugCanvas();

  // createCamera();

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

  // Setup Lighting & Import Models
  // setLighting();
  // importBaseModel("base.glb");
  importAnimationsAndModel(modelUrl, meshs);

  // Check Window Blur / Focus
  // setInterval(checkWindowFocused, 500);

  // scene.debugLayer.show({embedMode: true}).then(function () {
  // });

  setTimeout(() => {
    startTimeline();
  }, 400);
}

const MeshNames = {
  root: "__root__",
  EyeLeft: "EyeLeft",
  EyeRight: "EyeRight",
  Wolf3D_Head: "Wolf3D_Head",
  Wolf3D_Teeth: "Wolf3D_Teeth",
  Wolf3D_Hair: "Wolf3D_Hair",
  Wolf3D_Outfit_Top: "Wolf3D_Outfit_Top",
  Wolf3D_Outfit_Bottom: "Wolf3D_Outfit_Bottom",
  Wolf3D_Outfit_Footwear: "Wolf3D_Outfit_Footwear",
  Wolf3D_Body: "Wolf3D_Body",
};

function RGB_to_Color3(r, g, b) {
  let newColor = new BABYLON.Color3(
    r / 255 - 0.2,
    g / 255 - 0.2,
    b / 255 - 0.2
  );
  return newColor;
}

const chageMaterial = (data) => {
  let mesh = scene.getMeshByName(data.name);
  if (data.url) {
      mesh.material.albedoTexture = new BABYLON.Texture(data.url, scene)
  } else {
      mesh.material.albedoTexture = BABYLON.Texture.CreateFromBase64String(data.base64, data.name, scene)
  }     
};

const importModel = (modelUrl, meshs) => {
    // return BABYLON.SceneLoader.Append(null, modelUrl, "", scene)
    return BABYLON.SceneLoader.ImportMeshAsync(null, modelUrl, "", scene).then(
      (result) => {
        createCamera();
        const player = result.meshes[0];
        // console.log("player: ", player);
        console.log("scene: ", scene);
  
        // for (let i = 0; i < scene.meshes.length; i++) {
        //   console.log("meshName: ", scene.meshes[i].id);
          // console.log("meshName: ", );
        // }        
  
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
  
        try {
          let uniqueMeshs = meshs.filter((item, index) => {
            return (
              meshs.map((mapItem) => mapItem.name).indexOf(item.name) === index
            );
          });            
          uniqueMeshs.forEach(mesh => {
              chageMaterial(mesh);
          })
        } catch (err) {
          console.log("err", err);
        }
      }
    );
  };

function createCamera() {
  scene.createDefaultCameraOrLight(true, true, true);
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 1)
  );

  // 设置灯光亮度
  light.intensity = 1;

  // 镜面反射 漫反射 环境光颜色调整
  light.diffuse = new BABYLON.Color3(1, 1, 1);
  light.specular = new BABYLON.Color3(1, 1, 1);

  // 渲染模型后调整相机角度、位置、观察对象的三维坐标
  scene.activeCamera.alpha = 1.57;
  scene.activeCamera.beta = 1.42;
  scene.activeCamera.radius = 18;

  scene.activeCamera.setPosition(new BABYLON.Vector3(20, 4.32, 100));
  scene.activeCamera.setTarget(new BABYLON.Vector3(0, 0.95, 0));

  // 设置横向旋转角度上下限
  scene.activeCamera.upperBetaLimit = Math.PI * 0.5;
  scene.activeCamera.lowerBetaLimit = 0;

  // 设置镜头到目标位置距离半径的最大值
  scene.activeCamera.upperRadiusLimit = 2.5;

  // 设置鼠标滚轮灵敏度(数值越小灵敏度越高)
  scene.activeCamera.wheelPrecision = 250;

  // 控制鼠标平移相机镜头灵敏度(数值越小灵敏度越高|为0的时候取消平移操作)
  scene.activeCamera.panningSensibility = 2000;

  // 存储当前相机状态
  scene.activeCamera.storeState();
}

async function importAnimationsAndModel(modelUrl, meshs) {
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
  importModel(modelUrl, meshs);
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
      await wait(100);
      leftEye.influence = 0;
      rightEye.influence = 0;
      const randomNumber2 = getRandomNumber(1, 2);
      if (randomNumber2 === 1) {
        await wait(100);
        leftEye.influence = 1;
        rightEye.influence = 1;
        await wait(100);
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
let timelineInterval;
let msgQueuePushInterval;
let msgQueuePopInterval;
let isPushing;
let isRegisterBeforeRender;

async function startTimeline() {
  clearInterval(timelineInterval);
  clearInterval(msgQueuePushInterval);
  clearInterval(msgQueuePopInterval);

  // playSpeech();

  // Step 1 - Camera Animation
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

  // RegisterBeforeRender Morph Target Mouth
  msgQueuePushInterval = setInterval(async () => {
    if (!isPushing && store.userMessages.length > 0) {
      isPushing = true;
      let message = store.userMessages.shift();
      // console.log("message: ", message);
      if (message && message.length > 0) {
        // let ttsData = await tts({ text: message, text_language: "zh" });
        // console.log("ttsData: ", ttsData);
        // if (ttsData.code == 0) {
        msgQueue.enqueue(async () => {
          createSpeech(message);
        });
        // }
      }
      isPushing = false;
    }
  }, 1000);

  // msgQueuePushInterval = setInterval(async () => {
  //     if (!talking && messageList.length > 0) {
  //         let message = messageList.shift();
  //         if (message && message.length > 0) {
  //             createSpeech(message);
  //         }
  //     }
  // }, 300);

  msgQueuePopInterval = setInterval(async () => {
    if (!talking) {
      msgQueue.dequeue();
    }

    if (myAnalyser && !isRegisterBeforeRender) {
      scene.registerBeforeRender(function () {
        const workingArray = myAnalyser.getByteFrequencyData();
        let jawValue = 0;

        if (talking) {
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

    if (talking && !currentAnimation.isPlaying) {
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
  }, 1000);
}

async function createSpeech(base64) {
  talking = true;
  try {
    let buff = await base64ToBuffer(base64);
    speech = new BABYLON.Sound(
      "FromArrayBuffer",
      buff,
      scene,
      soundReadyToBePlayed
    );

    const speechTrack = new BABYLON.SoundTrack(scene);
    speechTrack.addSound(speech);
    // console.log('recognition', recognition)
    // try {
    //     if (recognition) {
    //         console.log('recognition.stop')
    //         recognition.stop();
    //     }
    // }catch (err) {
    //     console.error('err', err)
    // }

    myAnalyser = new BABYLON.Analyser(scene);
    speechTrack.connectToAnalyser(myAnalyser);
    myAnalyser.FFT_SIZE = 64;
    myAnalyser.SMOOTHING = 0.03;

    speech.onEndedObservable.add(() => {
      setTimeout(() => {
        // 延迟一下，避免语音没读完
        talking = false;
        console.log("ended");
      }, 1000);
    });

    // speech.onended = function() {
    //     // console.log("End Speech");
    //     talking = false;
    //     //scene.onBeforeRenderObservable.runCoroutineAsync(animationBlending(currentAnimation, 0.7, idle1, 0.7, false, 0.02, 0, idle1.duration, 0.8));
    // };
  } catch (e) {
    console.log("e", e);
    talking = false;
  }
}

function soundReadyToBePlayed() {
  speech.volume = 1;
  speech.play();
}

function base64ToBuffer(base64) {
  const base64String = "data:audio/mp3;base64," + base64;
  // 解码base64数据
  const binaryData = atob(base64String.split(",")[1]);
  const bytes = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    bytes[i] = binaryData.charCodeAt(i);
  }
  const blob = new Blob([bytes.buffer], { type: "audio/mp3" });
  let fr = new FileReader();
  fr.readAsArrayBuffer(blob);
  return new Promise(function (resolve, reject) {
    fr.addEventListener(
      "loadend",
      (e) => {
        let buf = e.target.result;
        resolve(buf);
      },
      false
    );
  });
}

async function soundPause() {
  // speech.stop();
  if (speech && !speech.paused) {
    speech.pause();
    speech.currentTime = 0;
  }
}

async function soundPlay() {
  if (speech && speech.paused) {
    speech.pause();
  }
}

async function soundStop() {
  if (speech && !speech.stop) {
    speech.stop();
    speech.currentTime = 0;
  }
  msgQueue.queue = [];
  recognition = null;
}

export function setRecognition(r) {
  recognition = r;
}

export function isTalkEnd() {
  console.log("msgQueue.queue.length", msgQueue.queue.length);
  console.log("talking", talking);
  return msgQueue.queue.length == 0 && !talking;
}

export {
  createPlayerScene,
  soundPause,
  soundStop,
  soundPlay,
  MeshNames,
  chageMaterial,
};

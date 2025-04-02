// import { useMain } from "@/store";
import { base64ToBlob } from "./base64s";
// import { useSelector, useDispatch } from 'react-redux';
// import { shiftMessage } from '@/store/modules/mainStore';

// const userMessages = useSelector(state => state.main.userMessages);
// const dispatch = useDispatch();
const live2d = PIXI.live2d;
let audio;
let model;

function createRenderer(color, canvas) {
  canvas = canvas || document.createElement('canvas');
  var renderer = new PIXI.WebGLRenderer(800, 600, {view: canvas});
  var stage = new PIXI.Container();
  var graphics = new PIXI.Graphics();
  graphics.beginFill(color, 0.5);
  graphics.drawCircle(0, 0, 200);
  graphics.endFill();
  stage.addChild(graphics);
  renderer.render(stage);
  return {renderer: renderer, stage: stage, graphics: graphics};
}

export async function createLive2DScene(canvas, url, rootBox) {
  if (url === "") url = 'https://cdn.jsdelivr.net/gh/Eikanya/Live2d-model/%E5%B4%A9%E5%9D%8F%E5%AD%A6%E5%9B%AD2/Kiana/model.json'
  const app = new PIXI.Application({
    view: canvas,
    autoStart: true,
    resizeTo: rootBox,
    // backgroundColor: 0x1A2435,
  });

  // let app = createRenderer(0xff0000, canvas);
  
  const bunny = PIXI.Sprite.from('1.png');
  bunny.x = 0;//
  bunny.y = 0;//
  app.stage.addChild(bunny);//


  // console.log("modelUrl: ", url);

  model = await live2d.Live2DModel.from(url);
  app.stage.addChild(model);

  const scaleX = (canvas.width * 0.4) / model.width;
  const scaleY = (canvas.height * 6) / model.height;

  // fit the window
  model.scale.set(Math.min(scaleX, scaleY));
  model.y = canvas.height * 0.1;

  // draggable(model);
  // addFrame(model);
  // addHitAreaFrames(model);

  model.x = (canvas.width - model.width) / 2;

  // handle tapping
  model.on("hit", (hitAreas) => {
    if (hitAreas.includes("body")) {
      model.motion("tap_body");
    }

    if (hitAreas.includes("head")) {
      model.expression();
    }
  });

  playIdle(model, "idle");

  return model;
}

/**
  * 
  * @param {Live2DModel} model -
  * @param {string} key - 
  */
export function playIdle(model, key) {
  model.motion(key);
  // model.internalModel.motionManager.state.setReservedIdle(key, 0);
  // model.internalModel.motionManager.groups.idle = key;
}

/**
 * 
 * @param {Live2DModel} model  -
 * @param {string} key - 
 */
export function playTalk(model, key) {
  // if (model.internalModel.motionManager.isFinished()) {
  //   model.motion(key, 0, MotionPriority.FORCE);
  // }

  model.motion(key);
}

let callbackFn;
let istalking;
let msgQueuePushInterval;
async function createSpeech(message) {
  if (!message || message.length == 0) return;

  try {
    const base64String = "data:audio/mp3;base64," + message;
    const blob = await base64ToBlob(base64String);
    audio = new Audio();
    audio.src = URL.createObjectURL(blob);
    audio.addEventListener('ended', function (e) {
      console.log('createSpeech end')
      istalking = false;
      startSpeech()
    });
    audio.play();
    audio.addEventListener('playing', function(event) {
      console.log('createSpeech play')
      istalking = true;
    });
    audio.addEventListener('error', function(event) {
      console.log('createSpeech audio err', event)
      istalking = false;
      startSpeech()
    });
  } catch (err) {
    console.log('createSpeech err', err)
    istalking = false;
    startSpeech()
  }
  
  // playIdle(model, "idle");
  // playTalk(model, "talk");
}

export function createSpeech2D(message) {
  // console.log('createSpeech2D', message)
  if (!message || message.length === 0) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const base64String = "data:audio/mp3;base64," + message;
    base64ToBlob(base64String)
      .then(blob => {
        // console.log('createSpeech2D blob', blob)
        audio = new Audio();
        audio.volume = 1;
        audio.src = URL.createObjectURL(blob);
        audio.play();
        audio.addEventListener('ended', function (e) {
          // console.log('createSpeech2D end', new Date());
          istalking = false;
          // startSpeech();
          resolve(); // 
        });
        audio.addEventListener('playing', function (event) {
          // console.log('createSpeech2D play', new Date());
          istalking = true;
        });
        audio.addEventListener('error', function (event) {
          // console.log('createSpeech2D audio err', event);
          istalking = false;
          // startSpeech();
          reject(new Error('Audio playback error')); // 
        });        
      })
      .catch(err => {
        // console.log('createSpeech2D err', err);
        istalking = false;
        // startSpeech();
        reject(err); // 
      });
  });
}

export async function startPlayList(callback) {
  callbackFn = callback;
  clearInterval(msgQueuePushInterval);
  msgQueuePushInterval = setInterval(async () => {
    // console.log('istalking', istalking, userMessages.length)
    // if (!istalking && store.userMessages.length > 0) {
    //   let data = store.userMessages.shift();
    //   createSpeech(data.audioMessage);
    //   callbackFn(data.chatMessage);
    // }
    startSpeech()
  }, 1000);
}

function startSpeech() {
  if (istalking) {
      console.log('istalking')
      return
  }
  
  // if (userMessages.length > 0) {
  //     let data = userMessages.shift();
  //     dispatch(shiftMessage)
  //     createSpeech(data.audioMessage);
  //     callbackFn(data.chatMessage);
  // }    
}

export function soundStop2() {
  if (audio) {
    istalking = false;
    audio.pause();
    audio.currentTime = 0;
    audio = null;
  }
}

export async function destroyLive2DScene() {
  if (!msgQueuePushInterval) return
  clearInterval(msgQueuePushInterval);
}


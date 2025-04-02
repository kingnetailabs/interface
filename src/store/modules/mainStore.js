import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
const UserAddressKey = "userAddress";

// 定义初始状态
const initialState = {
  gameEvents: [],
  gameEventAnimations: [],
  userAddress: localStorage.getItem(UserAddressKey) || "",
  showAiSide: true,
  screenWidth: window.innerWidth,
  userMessages: [],
  userInfo: {},
  generateRecord: [],
  isPlaying: false,
  sceneWidth: 720,
  sceneHeight: 1280,
  gameItems: [],
  currentMaterial: {},
  eventsDatas: [],
  animDatas: [],
  gameInfo: {
    name: "",
  },

  timers: [],
  variables: [],
  actions: [],
  currentAction: {},
  animations: [],
  onlineImageResources: [],
  coinSystems: [],
  attrTabIndex: "0",
};

const removeDataByProp = (datas, prop, data) => {
  return datas.filter((oldData) => oldData[prop] !== data[prop]);
};

const updateDataByProp = (datas, prop, data) => {
  return datas.map((oldData) =>
    oldData[prop] === data[prop] ? data : oldData
  );
};

// 创建Slice
const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.userAddress = action.payload;
      localStorage.setItem(UserAddressKey, action.payload);
    },
    userLogout: (state) => {
      console.log("userLogout");
      state.userAddress = "";
      localStorage.removeItem(UserAddressKey);
      localStorage.removeItem("token");
    },
    toggleShowAiSide: (state) => {
      state.showAiSide = !state.showAiSide;
    },
    updateScreenWidth: (state) => {
      state.screenWidth = window.innerWidth;
      state.showAiSide = window.innerWidth >= 750;
    },
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    pushMessage: (state, action) => {
      state.userMessages.push(action.payload);
    },
    shiftMessage: (state) => {
      state.userMessages.shift();
    },
    setMessage: (state, action) => {
      state.userMessages = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setGameItems: (state, action) => {
      state.gameItems = action.payload;
    },
    pushGameItem: (state, action) => {
      state.gameItems.push(action.payload);
    },
    removeGameItemByOriginalId: (state, action) => {
      state.gameItems = state.gameItems.filter(
        (item) => item.originalId !== action.payload.originalId
      );
    },
    updateGameItemByOriginalId: (state, action) => {
      state.gameItems = state.gameItems.map((item) =>
        item.originalId === action.payload.originalId ? action.payload : item
      );
    },
    pushGenerateRecord: (state, action) => {
      state.generateRecord.push(action.payload);
    },
    updateSecenWH: (state, action) => ({
      ...state,
      sceneWidth: action.payload?.[0] ?? 800,
      sceneHeight: action.payload?.[1] ?? 600,
    }),
    updateCurrentMaterial: (state, action) => ({
      ...state,
      currentMaterial: action.payload,
    }),
    updateEventsDatas: (state, action) => ({
      ...state,
      eventsDatas: action.payload,
    }),
    pushAnimDatas: (state, action) => ({
      ...state,
      animDatas: action.payload,
    }),
    setGameInfo: (state, action) => ({
      ...state,
      gameInfo: action.payload,
    }),
    setSceneList: (state, action) => ({
      ...state,
      sceneList: action.payload,
    }),
    pushSceneList: (state, action) => ({
      ...state,
      sceneList: [...state.sceneList, action.payload],
    }),
    updateSceneById: (state, action) => {
      const { id, ...rest } = action.payload;
      const index = state.sceneList.findIndex((item) => item.id === id);

      if (index !== -1) {
        let item = state.sceneList[index];
        let newObj = {};

        Object.keys(rest).forEach((key) => {
          if (Array.isArray(rest[key])) {
            newObj[key] = _.cloneDeep(item[key] || []);
            rest[key].forEach((restItemValue) => {
              let isExist = false;
              let updateIndex = 0;
              newObj[key].forEach((itemValue, itemValueIndex) => {
                if (itemValue.originalId === restItemValue.originalId) {
                  updateIndex = itemValueIndex;
                  isExist = true;
                }
              });
              if (isExist) {
                newObj[key][updateIndex] = restItemValue;
              } else {
                newObj[key].push(restItemValue);
              }
            });
          } else {
            newObj[key] = rest[key];
          }
        });

        item = { ...item, ...newObj };
        state.sceneList.splice(index, 1, item);
      }
    },
    removeSceneById: (state, action) => {
      state.sceneList = state.sceneList.filter(
        (item) => item.id !== action.payload.id
      );
    },
    removeScenePropertyValueById: (state, action) => {
      const { id, ...rest } = action.payload;
      const index = state.sceneList.findIndex((item) => item.id === id);

      if (index !== -1) {
        let item = state.sceneList[index];
        Object.keys(rest).forEach((key) => {
          if (Array.isArray(rest[key])) {
            rest[key]?.forEach((restItemValue) => {
              item[key]?.forEach((itemValue) => {
                if (itemValue.originalId === restItemValue.originalId) {
                  item[key].splice(item[key].indexOf(itemValue), 1);
                }
              });
            });
          }
        });

        state.sceneList.splice(index, 1, item);
      }
    },
    setCurrentScene: (state, action) => ({
      ...state,
      currentScene: action.payload,
    }),
    pushTimer: (state, action) => {
      state.timers.push(action.payload);
    },
    updateTimerById: (state, action) => {
      state.timers = updateDataByProp(state.timers, "id", action.payload);
    },
    removeTimerById: (state, action) => {
      state.timers = removeDataByProp(state.timers, "id", action.payload);
    },
    pushAction: (state, action) => {
      state.actions.push(action.payload);
    },
    updateActionById: (state, action) => {
      state.actions = updateDataByProp(state.actions, "id", action.payload);
    },
    removeActionById: (state, action) => {
      state.actions = removeDataByProp(state.actions, "id", action.payload);
    },
    setCurrentAction: (state, action) => {
      state.currentAction = action.payload;
    },
    pushAnimation: (state, action) => {
      state.animations.push(action.payload);
    },
    updateAnimationById: (state, action) => {
      state.animations = updateDataByProp(
        state.animations,
        "id",
        action.payload
      );
    },
    removeAnimationById: (state, action) => {
      state.animations = removeDataByProp(
        state.animations,
        "id",
        action.payload
      );
    },
    pushGameEventAnimation: (state, action) => {
      state.gameEventAnimations.push(action.payload);
    },
    updateGameEventAnimationById: (state, action) => {
      state.gameEventAnimations = updateDataByProp(
        state.gameEventAnimations,
        "id",
        action.payload
      );
    },
    removeGameEventAnimationById: (state, action) => {
      state.gameEventAnimations = removeDataByProp(
        state.gameEventAnimations,
        "id",
        action.payload
      );
    },
    pushUpgradeAnimation: (state, action) => {
      state.upgradeAnimations.push(action.payload);
    },
    updateUpgradeAnimationById: (state, action) => {
      state.upgradeAnimations = updateDataByProp(
        state.upgradeAnimations,
        "id",
        action.payload
      );
    },
    removeUpgradeAnimationById: (state, action) => {
      state.upgradeAnimations = removeDataByProp(
        state.upgradeAnimations,
        "id",
        action.payload
      );
    },
    pushVariable: (state, action) => {
      state.variables.push(action.payload);
    },
    updateVariableById: (state, action) => {
      state.variables = updateDataByProp(state.variables, "id", action.payload);
    },
    removeVariableById: (state, action) => {
      state.variables = removeDataByProp(state.variables, "id", action.payload);
    },
    pushOnlineImageResource: (state, action) => {
      state.onlineImageResources.push(action.payload);
    },
    removeOnlineImageResourceById: (state, action) => {
      state.onlineImageResources = removeDataByProp(
        state.onlineImageResources,
        "uid",
        action.payload
      );
    },
    pushCoinSystem: (state, action) => {
      state.coinSystems.push(action.payload);
    },
    updateCoinSystemById: (state, action) => {
      state.coinSystems = updateDataByProp(
        state.coinSystems,
        "id",
        action.payload
      );
    },
    removeCoinSystemById: (state, action) => {
      state.coinSystems = removeDataByProp(
        state.coinSystems,
        "id",
        action.payload
      );
    },
    setAttrTabIndex: (state, action) => {
      state.attrTabIndex = action.payload;
    },
   
    setGameData: (state, action) => {
      const { pixel_width, pixel_height, config, ...rest } = action.payload;

      state.gameInfo = { ...rest };
      state.screenWidth = pixel_width;
      state.screenHeight = pixel_height;
      if (config) {
        Object.entries(config).forEach(([key, value]) => {
          if (value) {
            state[key] = value;
          }
        });

        const firstScene = config.sceneList?.[0];
        if (firstScene) {
          state.currentScene = firstScene;
        }
      }
    },
    updateGameEvents: (state, action) => ({
      ...state,
      gameEvents: action.payload,
    }),
    deleteGameEvent: (state, action) => ({
      ...state,
      gameEvents: state.gameEvents.filter(
        (event) => event.id !== action.payload
      ),
    }),
    addGameEvent: (state, action) => ({
      ...state,
      gameEvents: [...state.gameEvents, action.payload],
    }),
    updateGameEvent: (state, action) => ({
      ...state,
      gameEvents: state.gameEvents.map((event) =>
        event.id === action.payload.id ? action.payload : event
      ),
    }),
  },
});

export const {
  userLogin,
  userLogout,
  pushMessage,
  shiftMessage,
  setIsPlaying,
  setMessage,
  pushGenerateRecord,
  updateSecenWH,
  setGameItems,
  pushGameItem,
  removeGameItemByOriginalId,
  updateGameItemByOriginalId,
  updateCurrentMaterial,
  updateEventsDatas,
  pushAnimDatas,
  setGameInfo,
  setSceneList,
  pushSceneList,
  removeSceneById,
  updateSceneById,
  setCurrentScene,
  pushTimer,
  removeTimerById,
  updateTimerById,
  pushVariable,
  removeVariableById,
  updateVariableById,
  removeScenePropertyValueById,
  pushAction,
  updateActionById,
  removeActionById,
  pushAnimation,
  updateAnimationById,
  removeAnimationById,
  pushUpgradeAnimation,
  updateUpgradeAnimationById,
  removeUpgradeAnimationById,
  pushOnlineImageResource,
  removeOnlineImageResourceById,
  pushCoinSystem,
  updateCoinSystemById,
  removeCoinSystemById,
  setCurrentAction,
  setAttrTabIndex,
  setGameData,
  updateGameEvents,
  deleteGameEvent,
  addGameEvent,
  updateGameEvent,
  updateGameEventAnimationById,
  removeGameEventAnimationById,
  pushGameEventAnimation,
} = mainSlice.actions;

export default mainSlice.reducer;

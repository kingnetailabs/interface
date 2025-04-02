import { useTranslation } from "react-i18next";
import { generate_role, get_history, view } from "@/api/ai";
import { getImagesFromOutputs } from "@/utils/getOutputsData";
import { App } from "antd";
import { saveResource, findResource } from "@/api/assetLibrary";

export default function commonData() {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const base = () => {
    const tabsData = [
      // data 3.26
      { id: 2, path: "/ai/Art2d", key: "Art2d", title: t("twoDGameArt") },
    ];

    const Art2d = [
      {
        id: 2,
        title: t("character"),
        path: "/ai/Art2d/Role",
        ico: require("@/assets/aiList/gamesArt2d/list/jixiangwu.png"),
        banner: require("@/assets/aiList/gamesArt2d/list/list2.png"),
        desc: t("characterDescription"),
      },
      {
        id: 3,
        title: t("weapon"),
        path: "/ai/Art2d/Weapon",
        ico: require("@/assets/aiList/gamesArt2d/list/archery.png"),
        banner: require("@/assets/aiList/gamesArt2d/list/list3.png"),
        desc: t("weaponDescription"),
      },
      {
        id: 4,
        title: t("gameItem"),
        path: "/ai/Art2d/Property",
        ico: require("@/assets/aiList/gamesArt2d/list/huowudui.png"),
        banner: require("@/assets/aiList/gamesArt2d/list/list4.png"),
        desc: t("itemDescription"),
      },
      {
        id: 5,
        title: t("gameScene"),
        path: "/ai/Art2d/GameScene",
        ico: require("@/assets/aiList/gamesArt2d/list/changjing.png"),
        banner: require("@/assets/aiList/gamesArt2d/list/list5.png"),
        desc: t("sceneDescription"),
      },
      {
        id: 6,
        title: t("building"),
        path: "/ai/Art2d/Building",
        ico: require("@/assets/aiList/gamesArt2d/list/jianzhu.png"),
        banner: require("@/assets/aiList/gamesArt2d/list/list6.png"),
        desc: t("buildingDescription"),
      },
      {
        id: 7,
        title: t("gameMap"),
        path: "/ai/Art2d/GameMap",
        ico: require("@/assets/aiList/gamesArt2d/list/yinxiao.png"),
        banner: require("@/assets/aiList/gamesArt2d/list/list7.png"),
        desc: t("mapDescription"),
      },
    ];

    return {
      tabsData,
      Art2d,
    };
  };

  const getApiStatus = async (apiParams, outKey, isProcess) => {
    //generate_role -> get_history -> view

    const generate = async (resolve, reject) => {
      const res = await generate_role(apiParams);
      if (res.code || res.code === 500)
        return message.error(res.msg || t("serverResponse")), reject();

      try {
        const { prompt_id } = res.data;
        history(prompt_id, resolve, reject);
      } catch (error) {
        console.log("generate_role error");
        reject();
      }
    };

    const history = async (id, resolve, reject) => {
      const checkStatus = async (id, attempt = 1) => {
        const res = await get_history({ name: id });

        if (res.code || res.code === 500) {
          return message.error(res.msg || t("serverResponse")), reject();
        }

        try {
          const { status_str } = res.data.status;
          // console.log(status_str, `Attempt: ${attempt}`);

          if (status_str === "success") {
            const outputsArr = getImagesFromOutputs(res, outKey);
            let dataResult = [];

            for (let i = 0; i < outputsArr.length; i++) {
              const outputs = outputsArr[i];
              if (outputs.text) {
                resolve(outputs);
              } else {
                const { filename, subfolder, type } = outputs;
                const resultRes = await result(
                  {
                    filename,
                    subfolder,
                    type,
                  },
                  resolve,
                  reject
                );
                dataResult.push(resultRes);
              }
            }

            console.log("dataResult===2", dataResult);

            if (dataResult.length == 1) {
              console.log(dataResult[0]);
              resolve(dataResult[0]);
            } else {
              resolve(dataResult);
            }
          } else if (status_str === "process") {
            const process = res.data.process || { max: 20, value: 0 };
            if (isProcess) {
              isProcess(process);
            }

            setTimeout(() => checkStatus(id, attempt + 1), 3000);
          } else {
            console.log("Unexpected status:", status_str);
            reject();
          }
        } catch (error) {
          console.log("get_history error", error);
          message.error(error || t("serverResponse"));
          reject();
        }
      };

      checkStatus(id);
    };

    const result = async (params, resolve, reject) => {
      let res = await view({
        avatar_type: 0,
        ...params,
      });

      if (res.code || res.code === 500) {
        return message.error(res.msg || t("serverResponse")), reject();
      }
      return res;
    };

    return new Promise((resolve, reject) => {
      generate(resolve, reject);
    });
  };

  const saveDataItem = async ({
    category_id,
    sub_category_id,
    url,
    generate_config,
  }) => {
    try {
      const res = await saveResource({
        type: 1,
        category_id,
        sub_category_id,
        url,
        generate_config,
      });
      if (!res.code) {
        console.log("==", res);
      } else console.log("==", res);
    } catch (error) {
      console.log("==", error);
    }
  };

  const getHistory = async ({
    category_id,
    sub_category_id,
    keyword = "",
    is_full_field = 1,
  }) => {
    const request = async (resolve, reject) => {
      const token = localStorage.getItem("token");
      if (!token) return reject();

      try {
        const res = await findResource({
          type: 1,
          limit: 30,
          page: 0,
          category_id,
          sub_category_id,
          keyword,
          is_full_field,
        });

        if (!res.code) {
          console.log("==", res);
          resolve(res);
        } else console.log("==", res), reject(res);
      } catch (error) {
        console.log("==", error);
        reject(error);
      }
    };

    return new Promise((resolve, reject) => {
      request(resolve, reject);
    });
  };

  return {
    base,
    getApiStatus,
    saveDataItem,
    getHistory,
  };
}

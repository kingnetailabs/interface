import { Spin, App } from "antd";
import { useState, useEffect } from "react";
import SubBtn from "../../components/SubBtn";
import { useTranslation } from "react-i18next";

//--
import PreviewImgList from "../../components/PreviewImgList";
import commonData from "../../common/data";
import SelectData from "./data";
import Item from "./Item";
import Cascader from "../../components/Cascader";
import TextArea from "../../components/TextArea";
import UploadImage from "../../components/UploadImage";
import NumberInput from "../../components/NumberInput";
import GiveExample from "../../components/GiveExample";
import { useSelector } from "react-redux";

export default function GameMap() {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { getApiStatus, saveDataItem, getHistory } = commonData();
  const { userAddress } = useSelector((state) => state.main);

  const { types, sizes, presets, presetsStrength, keywords, formData } =
    SelectData();

  const [spinLoad, setSpinLoad] = useState(false);
  const [apiParams, setApiParams] = useState(formData);
  const [atData, setAtData] = useState({});
  const [isProcess, setIsProcess] = useState(0);
  const [historyList, setHistoryList] = useState([]);

  const addParams = (value) => {
    console.log(value);

    setApiParams((prevState) => ({ ...prevState, ...value }));
  };

  const submit = async () => {
    console.log(`提交`, apiParams);

    if (!apiParams.prompt) {
      message.error(t("enterKeywordPrompt"));
      return;
    }

    setSpinLoad(true);
    setIsProcess(0);

    try {
      const res = await getApiStatus(apiParams, apiParams.outKey, (process) => {
        console.log("process======", process);
        const { max, value } = process;
        setIsProcess(Math.floor((value / max) * 100));
      });
      console.log("===", res);

      const currentTime = new Date().toLocaleString();
      let jsonData = {
        ...apiParams,
        imgUrl: res.data.img,
        time: currentTime,
      };

      await saveDataItem({
        category_id: 2,
        sub_category_id: 7,
        url: res.data.img,
        generate_config: jsonData,
      });

      setAtData(jsonData);

      await getHistoryList();

      setSpinLoad(false);
    } catch (error) {
      console.log("===", error);

      setSpinLoad(false);
    }
  };

  const getHistoryList = async () => {
    getHistory({
      category_id: 2,
      sub_category_id: 7,
    })
      .then((res) => {
        setHistoryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (userAddress) {
      getHistoryList();
    } else {
      setHistoryList([]);
      setAtData({});
    }
  }, [userAddress]);

  return (
    <>
      <Spin
        spinning={spinLoad}
        tip={`${t("processingStatus")}：${isProcess}%`}
      >
        <div className="list-options">
          <Cascader
            title={types.title}
            sub={types.sub}
            options={types.options}
            val={apiParams.types}
            onChange={addParams}
          />
          {apiParams.types?.[0] == 0 && (
            <GiveExample
              options={keywords.options[apiParams.types?.[0]]}
              tab={apiParams.types}
              onChange={addParams}
            />
          )}

          <TextArea
            title={keywords.title}
            val={apiParams.prompt}
            onChange={addParams}
          />

          {apiParams.types?.[0] == 0 && (
            <NumberInput
              title={sizes.title}
              options={sizes.options}
              onChange={addParams}
            />
          )}

          {(apiParams.types?.[0] == 1 || apiParams.types?.[0] == 2) && (
            <>
              <UploadImage title={presets.title} onChange={addParams} />
              <Cascader
                keyName="presetsStrength"
                title={presetsStrength.title}
                options={presetsStrength.options}
                onChange={addParams}
              />
            </>
          )}

          <SubBtn onClick={submit} />
        </div>
        <PreviewImgList
          atData={atData}
          historyList={historyList}
          ImageRender={Item}
        />
      </Spin>
    </>
  );
}

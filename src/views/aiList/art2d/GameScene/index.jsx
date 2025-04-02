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
import Slider from "../../components/Slider";
import GiveExample from "../../components/GiveExample";
import { useSelector } from "react-redux";

export default function GameScene() {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { getApiStatus, saveDataItem, getHistory } = commonData();
  const { types, keywords, sizes, intensity, formData } = SelectData();
  const { userAddress } = useSelector((state) => state.main);

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
        sub_category_id: 5,
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
      sub_category_id: 5,
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
          <GiveExample
            options={keywords.options[apiParams.types?.[0]]}
            tab={apiParams.types}
            onChange={addParams}
          />
          <TextArea
            title={keywords.title}
            val={apiParams.prompt}
            onChange={addParams}
          />
          <Cascader
            title={sizes.title}
            options={sizes.options}
            keyName="sizes"
            onChange={addParams}
          />
          <Slider
            title={intensity.title}
            marks={intensity.marks}
            min={intensity.min}
            max={intensity.max}
            val={apiParams.intensity}
            keyName="intensity"
            onChange={addParams}
          />

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

import { App, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import SubBtn from "../../components/SubBtn";
//--
import Cascader from "../../components/Cascader";
import TextArea from "../../components/TextArea";
import commonData from "../../common/data";
import SelectData from "./data";
import PreviewImgList from "../../components/PreviewImgList";
import Item from "./Item";
import GiveExample from "../../components/GiveExample";
import { useSelector } from "react-redux";

export default function Role() {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { userAddress } = useSelector((state) => state.main);

  const { getApiStatus, saveDataItem, getHistory } = commonData();
  const { types, keywords, presets, sizes, formData, seed } = SelectData();

  const [spinLoad, setSpinLoad] = useState(false);
  const [apiParams, setApiParams] = useState(formData);
  const [atData, setAtData] = useState({});
  const [isProcess, setIsProcess] = useState(0);
  const [historyList, setHistoryList] = useState([]);

  const addParams = (value) => {
    setApiParams((prevState) => ({ ...prevState, ...value }));
  };

  const submit = async () => {
    console.log(`提交`, apiParams);
    if (!apiParams.prompt) {
      return message.error(t("enterKeyword"));
    }

    setSpinLoad(true);
    setIsProcess(0);
    
    try {
      let outKey = [apiParams.outKey[0]];
      const res = await getApiStatus(apiParams, outKey, (process) => {
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
        sub_category_id: 2,
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
      sub_category_id: 2,
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

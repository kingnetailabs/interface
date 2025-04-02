import { Spin, App } from "antd";
import { useState, useEffect } from "react";
import SubBtn from "../../components/SubBtn";
import commonData from "../../common/data";
import { useTranslation } from "react-i18next";

//--
import Cascader from "../../components/Cascader";
import TextArea from "../../components/TextArea";
import GiveExample from "../../components/GiveExample";
import PreviewImgList from "../../components/PreviewImgList";
import Item from "./Item";
import SelectData from "./data";
import { useSelector } from "react-redux";

export default function Weapon() {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { getApiStatus, saveDataItem, getHistory } = commonData();
  const { types, sizes, keywords, formData } = SelectData();
  const { userAddress } = useSelector((state) => state.main);

  const [spinLoad, setSpinLoad] = useState(false);
  const [apiParams, setApiParams] = useState(formData);
  const [atData, setAtData] = useState({});
  const [isProcess, setIsProcess] = useState(0);
  const [historyList, setHistoryList] = useState([]);

  const addParams = (value) => {
    setApiParams((prevState) => ({ ...prevState, ...value }));
  };

  const submit = async () => {
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
        sub_category_id: 3,
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
      sub_category_id: 3,
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
            sub={sizes.sub}
            options={sizes.options}
            val={apiParams.sizes}
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

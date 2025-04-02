import React, { useState, useEffect } from "react";
import agents from "./agents.module.scss";
import { useTranslation } from "react-i18next";
import AgentItem from "./components/AgentItem";
import { assistantCustomfind, assistantAllFind, assistantMine } from "@/api/ai";
// import { useSelector } from '@/store/modules/userStore'; // 替换为正确的路径
import { useSelector } from "react-redux";
// import { current } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
export default function Index() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userAddress } = useSelector((state) => state.main);
  // let userAddress = localStorage.getItem("address");

  const [tabCurrent, setTabCurrent] = useState(0);
  let tab = [
    { id: 0, text: t("all") },
    { id: 1, text: "AI AGENT" },
  ];


  const handleTab = (item) => {
    console.log("handleTab", item);
    setTabCurrent(item.id);
    // fetchData();
  };

  function personaFormatter(persona) {
    let obj = tab.find((item) => item.id == persona);
    if (obj) {
      return obj.text;
    }

    return "";
  }

  function handleEdit() {
    navigate(`/agent/create`);
  }

  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState({
    page: 0,
    limit: 5,
    persona: 0,
    keyword: "",
  });

  const handleKeywordChange = (event) => {
    setSearch({
      ...search,
      keyword: event.target.value,
    });
  };

  const fetchAllData = async () => {
    let data = [];

    const meData = await assistantMine();
    console.log("meData", meData);
    if (meData?.code == 0) {
      if (meData.data.id !== 0)
        data.push({
          persona: 0,
          assistants: [meData.data],
        });
    }

    let params = search;
    params.persona = 1;
    const personaData = await assistantCustomfind(params);
    if (personaData.code == 0) {
      if (personaData.data.length !== 0)
        data.push({
          persona: 1,
          assistants: personaData.data,
        });
    }

    console.log("data=====", data);
    setAllDatas(data);
  };

  const fetchData = async () => {
    if (tabCurrent == 0) {
      fetchAllData();
      return;
    }
    let params = search;
    params.persona = 1;
    let res = await assistantCustomfind(params);
    if (res.code !== 0) {
      console.log("msg", res.msg);
      return;
    }

    console.log(res.total);

    setTotal(res.total);
    setDatas(res.data);
  };

  const goPage = (page) => {
    console.log(page);
    const value = {
      page: page - 1,
    };

    setSearch((prevState) => ({ ...prevState, ...value }));
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [userAddress]);

  useEffect(() => {
    fetchData();
  }, [tabCurrent]);

  const [datas, setDatas] = useState([]);

  const [allDatas, setAllDatas] = useState([]);

  const renderAgentItems = (items) => {
    return items.map((item) => {
      return (
        <div className="agentItem">
          <AgentItem key={item.id} data={item} />
        </div>
      );
    });
  };

  function renderAllDatas() {
    if (tabCurrent > 0) return "";

    return allDatas.map((item, index) => (
      <>
        <div className="item-root" key={index}>
          <div className="title-box">
            <div className="title2">
              {item.persona == 0
                ? t("MyAIAgent")
                : personaFormatter(item.persona)}
            </div>
          </div>

          <div className={"list-root"}>{renderAgentItems(item.assistants)}</div>
        </div>
      </>
    ));
  }

  return (
    <div className={agents.container}>
      <div className="wrap-search">
        <div className="title">AI AGENT</div>
      </div>

      <div className="tab">
        {tab.map((item) => {
          return (
            <span
              key={item.id}
              className={item.id == tabCurrent ? "active" : ""}
              onClick={() => handleTab(item)}
            >
              {item.text}
            </span>
          );
        })}
      </div>

      {/* <!-- son tab --> */}
      {tabCurrent > 0 && (
        <div className="item-root">
          <div className="title-box">
            <div className="title2">{personaFormatter(tabCurrent)}</div>
          </div>

          <div className="list-root">{renderAgentItems(datas)}</div>

          <Pagination
            align="center"
            defaultCurrent={search.page + 1}
            defaultPageSize={search.limit}
            total={total}
            onChange={goPage}
          />
        </div>
      )}

      {/* <!-- all tab --> */}
      {renderAllDatas()}
    </div>
  );
}

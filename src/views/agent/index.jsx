import React, { useEffect, useState, useRef } from "react";
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";
import { getAvatar, truncateMiddle } from "@/common/common";
import { assistantFindbyid, getUser } from "@/api/ai";
import Image from "@/components/Image";
import { Statistic, Input, Popover, App, message, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import useChat from "@/hooks/useChat";
import ChatRecord from "@/components/ChatRecord";
import ShowAgent from "@/components/ShowAgent";
import { useDispatch, useSelector } from "react-redux";
// import Typewriter from 'react-typewriter-hook';
import Typewriter from "@/components/Typewriter";
import { useParams, useNavigate } from "react-router-dom";
import buySubscribe from "@/components/Subscribe";
function agent() {
  // const { id } = useParams();
  const aiId = useParams().id;
  const { SubscribeModal } = buySubscribe();

  const { t } = useTranslation();

  const { TextArea } = Input;
  const [tab, setTab] = useState(1);
  const [token, setToken] = useState("0");
  const navigate = useNavigate();
  const {
    currentData,
    setCurrentData,
    string,
    chattingRecord,
    inputMsg,
    setInputMsg,
    flag,
    sendMsg,
    chatBoxRef,
    scrollToBottom,
    speed,
    showMsg,
    setSpeed,
    setIs2D,
    isLoading,
    audio,
  } = useChat(true);

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    scrollToBottom();
  }, [tab]);

  const fetchData = async () => {
    // console.log(useParams());
    // const id = 17;

    if (isNaN(aiId)) {
      console.log("id must number");
      api.error({
        message: "Tips",
        description: "id must number",
      });
      return;
    }

    let res = await assistantFindbyid({ id: aiId });
    if (res.code == 0) {
      setCurrentData(res.data);
      setIs2D(res.data.figure_type == 2);
    } else {
      console.log("notification", notification);
      api.error({
        message: "Tips",
        description: res.msg,
      });
    }
  };

  useEffect(() => {
    refreshToken();
  }, [chattingRecord]);

  const refreshToken = async () => {
    setTimeout(async () => {
      let res = await getUser();
      if (res.code == 0) {
        setToken(res.data.token);
      }
    }, 300);
  };

  const typewriterRef = useRef();

  const handleReset = () => {
    if (typewriterRef.current) {
      typewriterRef.current.reset();
    }
  };

  useEffect(() => {
    console.log("audio", audio);
    handleReset();
  }, [audio.content]);

  const tabs = [
    { label: t("BasicInformation"), value: 1 },
    { label: t("ChatRecord"), value: 2 },
  ];

  const tagFormatter = (item) => {
    const data = {
      1: "AI AGENT",
    };

    return data[item.persona];
  };

  // const userAddress = localStorage.getItem("address");
  const { userAddress } = useSelector((state) => state.main);

  function handleEdit(id) {
    if (id) {
      navigate(`/agent/create/${id}`);
    } else {
      navigate(`/agent/create`);
    }
  }

  function renderChatRecord() {
    if (tab != 2) return;
    return (
      <>
        <div
          ref={chatBoxRef}
          style={{
            flex: 1,
            overflowY: "scroll",
          }}
        >
          <ChatRecord
            data={currentData}
            chatRecords={chattingRecord}
          ></ChatRecord>
        </div>
      </>
    );
  }

  function renderInfoBox() {
    if (tab != 1) return "";
    return (
      <div className="info-box">
        <Image className="avatar-box" src={getAvatar(currentData)} />
        <div className="name">{currentData.assistant_name}</div>
        <div className="tag">{tagFormatter(currentData)}</div>
        <div className="create">
          Created by @{truncateMiddle(currentData.owner, 8)}
        </div>
        <div className="descr">{currentData.description}</div>
        <div className="action-box"></div>

        <div className="add-box" onClick={() => navigate("/agents")}>
          {t("ViewMoreAIAgents")}
          <div className="icon">
            <Image src="ai/ysjt.png"></Image>
          </div>
        </div>
      </div>
    );
  }

  const [isFocus, setIsFocus] = useState(false);

  async function send() {
    const res = await getUser();
    console.log(res.data.comfyui_limit)
    if (!res.data.comfyui_limit) {
      return SubscribeModal();
    }

    sendMsg(inputMsg);
  }

  const popoverRef = useRef(null);

  const speeds = [
    {
      label: "0.5X",
      value: 0.5,
    },
    {
      label: "1X",
      value: 1,
    },
    {
      label: "1.5X",
      value: 1.5,
    },
    {
      label: "2X",
      value: 2,
    },
  ];
  // const [speed, setSpeed] = useState(1);
  const content2 = (
    <>
      <div className="popover-content">
        <div className="popover-avatar-box">
          <Image src={getAvatar(currentData)} className="popover-avatar" />
          <div>
            <div className="popover-name">{currentData.assistant_name}</div>
            <div className="popover-created single-line">
              Created by @{truncateMiddle(currentData.owner, 8)}
            </div>
            <div className="popover-created single-line">
              {currentData.description}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const msgBox = useRef(null);

  function renderCenterBox() {
    return (
      <>
        <div className="bg agent-box">
          <div className="top-box">
            <div className="popover-root" ref={popoverRef}>
              <Popover
                content={content2}
                getPopupContainer={() => {
                  return popoverRef.current;
                }}
                placement="bottom"
                arrow={false}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={getAvatar(currentData)}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <Image
                    src="ai/xiala.png"
                    style={{ width: "10px", marginLeft: "5px" }}
                  />
                </div>
              </Popover>
            </div>
          </div>

          {/* 智能体 */}
          <div className="agent-body">
            <ShowAgent
              src={currentData.figure}
              type={currentData.figure_type}
              className="roleCanvas"
            ></ShowAgent>

            <div className="msg-box">
              {isLoading && (
                <div className="msg">
                  <LoadingOutlined />
                </div>
              )}

              {!isLoading && audio && (
                <div className="msg" ref={msgBox}>
                  <Typewriter ref={typewriterRef} text={audio.content} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={isFocus ? "input-box input-box-focus" : "input-box"}>
          <div className="send-chat bg">
            <div className="send-box">
              <div className="top">
                <TextArea
                  autoSize
                  placeholder={t("questionsNeeds")}
                  style={{
                    color: "#fff",
                    border: "none",
                    background: "rgba(0, 0, 0, 0)",
                  }}
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  onKeyUp={async (event) => {
                    if (event.key === "Enter") {
                      let msg = inputMsg.trimEnd();
                      setInputMsg(msg);

                      const res = await getUser();
                      console.log(res.data.comfyui_limit)
                      if (!res.data.comfyui_limit) {
                        return SubscribeModal();
                      }
                      sendMsg(msg);
                    }
                  }}
                  onFocus={() => {
                    setIsFocus(true);
                  }}
                  onBlur={() => {
                    setIsFocus(false);
                  }}
                />
              </div>
            </div>

            <Image
              src="ai/send.png"
              onClick={() => send()}
              style={{ cursor: "pointer", width: "34px" }}
            ></Image>
          </div>
        </div>
      </>
    );
  }

  useEffect(() => {
    refreshToken();
    fetchData();
  }, [userAddress]);

  return (
    <div className={styles["agent-root"]}>
      {/* <div> */}
      <div className="center-box">{renderCenterBox()}</div>

      <div className="right-box bg flex flex-col">
        <div className="tab-box">
          {tabs.map((item, index) => {
            return (
              <div
                key={index}
                className={item.value == tab ? "tab active" : "tab"}
                onClick={() => {
                  setTab(item.value);
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>

        {/* info-box */}
        {renderInfoBox()}
        {renderChatRecord()}
      </div>
    </div>
  );
}
export default agent;

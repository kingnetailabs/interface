import { chat } from "@/api/ai";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { message, App } from "antd";
import usePlayAudio from "./usePlayAudio";
import { useDispatch, useSelector } from "react-redux";
import { pushMessage, shiftMessage } from "@/store/modules/mainStore";
import _ from "lodash";

const useChat = (isPlay = false) => {
  const { t } = useTranslation();
  // const [messageApi, contextHolder] = message.useMessage();
  const { message, notification } = App.useApp();
  const [currentData, setCurrentData] = useState({});
  const [string, setString] = useState("");
  const [chattingRecord, setChattingRecord] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const chatBoxRef = useRef(null);
  const [flag, setFlag] = useState(true);
  const [isStream, setIsStream] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [showMsg, setShowMsg] = useState(false);
  const { audio, setIs2D } = usePlayAudio();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    scrollToBottom();
  }, [chattingRecord]);

  const sendMsg = async (msg) => {
    if (!localStorage.getItem("token")) {
      notification.error({
        message: "Please login first",
      });
      return;
    }

    if (msg === "" || !flag) {
      notification.error({ message: t("conversationProgress") });
      return;
    }

    setFlag(false);
    setString("");
    setInputMsg("");

    const chattingRecordParams = _.cloneDeep(chattingRecord);
    setChattingRecord((prev) => [...prev, { role: "user", content: msg }]);
    chattingRecordParams.push({ role: "user", content: msg });
    // console.log('chattingRecord', chattingRecord);

    let id = Date.now();
    setChattingRecord((prev) => [
      ...prev,
      { role: "assistant", content: "", loddingShow: true, id },
    ]);
    // chattingRecordParams.push({ role: "assistant", content: "", loddingShow: true, id });

    setShowMsg(true);
    setIsLoading(true);

    console.log("currentData", currentData);
    let chatParams = {
      messages: chattingRecordParams,
      assistant_id: currentData.id,
      stream: isStream,
    };
    isStream ? request(chatParams) : handleSendChat(chatParams);
  };

  const handleSendChat = async (chatParams) => {
    try {
      let info = await chat(chatParams);
      handleMessageEvent(info);
    } catch (error) {
      // cancelSendChat();
    }
  };

  const request = (chatParams) => {
    const url =
      import.meta.env.VITE_APP_BASE_API + "/v1/h5/api/chatgpt/chat/completions";
    try {
      fetchEventSource(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Token": "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(chatParams),
        onopen(event) {},
        onmessage(event) {
          setIsLoading(false);
          handleMessageEvent(event);
        },
        onclose(event) {
          setFlag(true);
        },
        onerror(error) {
          setIsLoading(false);
          setFlag(true);
          throw error;
        },
      });
    } catch (error) {
      console.log("error :", error);
    }
  };

  const handleMessageEvent = (event) => {
    setShowMsg(true);
    if (isStream) {
      if (event.data === "[DONE]") return;

      const eventData = JSON.parse(event.data);
      const data = eventData.choices[0];
      if (data.finish_reason !== "stop" && data.delta.content !== undefined) {
        setString((prev) => prev + data.delta.content);
        setChattingRecord((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].content += data.delta.content;
          return updated;
        });

        if (isPlay) {
          dispatch(pushMessage(data.delta));
        }
      }
    } else {
      if (event.code === 0) {
        setChattingRecord((prev) => [...prev, event.data.choices[0].message]);
        setFlag(true);
      }
    }
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const getChatParams = () => {
    return {
      messages: chattingRecord,
      assistant_id: currentData.id,
      stream: isStream,
    };
  };

  return {
    currentData,
    setCurrentData,
    string,
    chattingRecord,
    setChattingRecord,
    inputMsg,
    setInputMsg,
    flag,
    sendMsg,
    chatBoxRef,
    scrollToBottom,
    speed,
    setSpeed,
    showMsg,
    setIsStream,
    setIs2D,
    isLoading,
    audio,
  };
};

export default useChat;

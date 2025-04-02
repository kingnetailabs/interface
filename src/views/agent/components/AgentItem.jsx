import agentItem from "./agentItem.module.scss";
import { getAvatar } from "@/common/common";
import { useNavigate } from "react-router-dom";

export default function AgentItem({ data, imgType }) {
  const navigate = useNavigate();

  const handleChat = () => {
    navigate(`/agent/${data.id}`);
  };

  function truncateMiddle(text, length) {
    if (!text) {
      return;
    }
    if (text.length <= length) {
      return text;
    } else {
      const headLength = Math.ceil(length / 2);
      const tailLength = Math.floor(length / 2);
      return text.slice(0, headLength) + "..." + text.slice(-tailLength);
    }
  }

  return (
    <>
      <div className={agentItem["agent-item"]} onClick={() => handleChat()}>
        <img
          className={imgType == 2 ? "img2 img" : "img"}
          src={getAvatar(data)}
        ></img>

        <div className="agent-body">
          <div className="title-box">
            <div className="title">{data.assistant_name}</div>
          </div>
          <div className="desc">{data.description}</div>
        </div>
        <div className="agent-footer">
          Created by @{truncateMiddle(data.owner, 8)}
        </div>
      </div>
    </>
  );
}

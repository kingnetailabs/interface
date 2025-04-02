import "../components.scss";
import { useTranslation } from "react-i18next";
import commonData from "../../common/data";
import { Image } from "antd";
import { findParentLabels, findLabel } from "@/utils/getOutputsData";

export default function PreviewImgList(props) {
  const { t } = useTranslation();
  const { atVideo = [], historyList = [] } = props;
  const { types } = commonData().ImgToVideo();
  const list = (data) => {
    return (
      <ul className="list-video">
        {data.map((item, i) => {
          return (
            <li key={i}>
              <div className="img">
                <video
                  width={"240px"}
                  height={"240px"}
                  controls
                  src={item.videoUrl}
                ></video>
              </div>
              <div className="info">
                <div>
                  {t("generationTime")}：{item.time}
                </div>
                <div>
                  {t("styleClassification")}：
                  <span>
                    {findParentLabels(types.options, item.prompt_strategy)}
                  </span>
                </div>
                <div>
                  {t("keywordDescription")}：<span>{item.prompt}</span>
                </div>
                <div>
                  {`${t("dynamicScaling")}：`}
                  <span>{`${item.scaling * 100}%`}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <div className="result-box">
        <div className="title">{t("preview")}</div>
        <div className={!atVideo.length ? "at-box" : ""}>{list(atVideo)}</div>
        <div className="title">{t("history")}</div>
        <div>{list(historyList)}</div>
      </div>
    </>
  );
}

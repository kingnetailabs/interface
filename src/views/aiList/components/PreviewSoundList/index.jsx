import "../components.scss";
import { useTranslation } from "react-i18next";

export default function PreviewImgList({ isClass, atSound, historyList }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="result-box">
        <div className="title">{t("generationResult")}</div>
        <div className={!isClass ? "at-sound-box" : ""}>{atSound}</div>
        <div className="title">{t("history")}</div>
        <div>{historyList}</div>
      </div>
    </>
  );
}

import "../components.scss";
import { useTranslation } from "react-i18next";

export default function PreviewImgList({ atText, historyList, Item }) {
  const { t } = useTranslation();

  function removeArray(array) {
    const newArray = array.slice(1);
    return newArray;
  }

  return (
    <>
      <div className="result-box">
        <div className="title">{t("reverseInference")}</div>
        <div className={!atText.length ? "at-text-box" : ""}>
          <Item data={atText} />
        </div>
        <div className="title">{t("history")}</div>
        <div>
          <Item data={atText.length ? removeArray(historyList) : historyList} />
        </div>
      </div>
    </>
  );
}

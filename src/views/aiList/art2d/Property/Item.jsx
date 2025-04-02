import { useTranslation } from "react-i18next";
import styles from "@/views/aiList/components/PreviewImgList/PreviewImgList.module.scss";
import CopyBtn from "@/views/aiList/components/PreviewImgList/CopyBtn";
import RenderImg from "@/views/aiList/components/PreviewImgList/RenderImg";
import SelectData from "./data";
import { findParentLabels } from "@/views/aiList/common";

const imageRender = ({ obj, infoBoxW = "300px" }) => {
  const { t } = useTranslation();
  const { types } = SelectData();

  const item = obj.generate_config;

  const allParentLabels = findParentLabels(types, {
    prompt_strategy: item.prompt_strategy,
    outKey: item.outKey,
  });

  const previewImg = (
    <>
      <div className={styles["ai-preview-img-box"]}>
        <div className={styles["img-box"]}>
          <RenderImg
            url={item.imgUrl}
            width={"300px"}
            style={{ maxHeight: "700px", objectFit: "contain" }}
          />
        </div>
        <div className={styles["info-box"]} style={{ width: infoBoxW }}>
          <div>
            {t("generationTime")}：<span>{item.time}</span>
          </div>
          <div>
            {t("styleClassification")}：<span>{allParentLabels}</span>
          </div>
          <div>
            {t("keywordDescription")}：<span>{item.prompt}</span>
            <CopyBtn text={item.prompt} />
          </div>
        </div>
      </div>
    </>
  );

  return previewImg;
};

export default imageRender;

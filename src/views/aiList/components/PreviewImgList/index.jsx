import styles from "./PreviewImgList.module.scss";
import "../components.scss";
import { useTranslation } from "react-i18next";

import RenderImg from "./RenderImg";
import Masonry from "react-masonry-css";
import ActionField from "../ActionField";
import { useEffect, useState } from "react";
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default function PreviewImgList({ atData, historyList, ImageRender }) {
  const { t } = useTranslation();

  const isEmptyObject =
    atData && Object.keys(atData).length === 0 && atData.constructor === Object;

  function removeArray(array) {
    let newArray = array;

    if (Object.keys(atData).length !== 0) {
      newArray = array.slice(1);
      console.log(array, newArray);
    }
    return newArray;
  }

  const [list, setList] = useState(removeArray(historyList));

  const upData = ({ id }) => {
    const newArray = list.filter((item) => item.id !== id);
    setList(newArray);
  };

  useEffect(() => {
    setList(removeArray(historyList));
  }, [historyList]);

  return (
    <>
      <div className="result-box">
        <div className="title">{t("generationResult")}</div>
        <div className={isEmptyObject ? "at-box" : "at-box"}>
          {!isEmptyObject ? (
            <RenderImg url={atData.imgUrl} width={"100%"} />
          ) : (
            ""
          )}
        </div>
        <div className="title">{t("history")}</div>
        <div>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={styles["masonry-grid"]}
            columnClassName={styles["masonry-grid_column"]}
          >
            {list.map((item, i) => (
              <div className={styles["render-img-box"]} key={i}>
                <RenderImg
                  key={item.imgUrl || item.url}
                  url={item.imgUrl || item.url}
                  width={"100%"}
                  imageRender={() => <ImageRender obj={item} />}
                />
                <ActionField data={item} upData={() => upData(item)} />
              </div>
            ))}
          </Masonry>
        </div>
      </div>
    </>
  );
}

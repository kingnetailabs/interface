import { useNavigate, useLocation } from "react-router-dom";
import { Modal } from "antd";
import styles from "./aiList.module.scss";
import commonData from "./common/data";
import { useTranslation } from "react-i18next";

export default function aiList() {
  const { t } = useTranslation();
  let navigate = useNavigate();
  let { pathname } = useLocation();
  const [modal, contextHolder] = Modal.useModal();
  const AssetsUrl = import.meta.env.VITE_APP_ASSETS_URL;

  const { tabsData } = commonData().base();

  const parts = pathname.split("/");
  const trimmedParts = parts.filter((part) => part !== "");

  let List = [];

  List = commonData().base()[trimmedParts[1]];
  if (typeof List == "undefined") {
    List = [];
  }

  const goPages = (path) => {
    console.log(path);
    if (!path) {
      modal.info({
        title: "TIPS",
        content: t("stayTuned"),
      });
      return;
    }

    navigate(path);
  };

  return (
    <>
      {contextHolder}
      <div>
        <img src={`${AssetsUrl}home/aiBanner.png`} alt="pageBanner" />
      </div>
      <div className={styles["al-list"]}>
        <div className={styles["tab"]}>
          {tabsData.map((item) => {
            return (
              <span
                key={item.id}
                className={pathname === item.path ? styles.active : ""}
                onClick={() => goPages(item.path)}
              >
                {item.title}
              </span>
            );
          })}
        </div>

        <div className={styles["list"]}>
          {List.map((item) => (
            <div
              className={styles["item"]}
              key={item.id}
              onClick={() => goPages(item.path)}
            >
              <img
                className={styles["item-img"]}
                src={item.banner}
                alt={item.title}
              ></img>
              <div className={styles["title"]}>
                <div className={styles["ico"]}>
                  <img src={item.ico} alt={item.title} />
                </div>
                {item.title}
              </div>
              <div className={styles["desc"]}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

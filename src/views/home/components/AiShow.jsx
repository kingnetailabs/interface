import styles from "./components.module.scss";
import Image from "@/components/Image";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const AiShow = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const AssetsUrl = import.meta.env.VITE_APP_ASSETS_URL;
  return (
    <>
      <div className={styles.AiShow}>
        <div className={styles.home_page_title + " Impact"}>
          <span>Agent Virtual human interaction</span>
        </div>

        <div className={styles.info}>
          <div className={styles.l}>
            <video className={styles.myVideo} autoPlay loop muted>
              <source
                src={`${AssetsUrl}home/AiShow-shipin.mov`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className={styles.fgx}></div>
          <div className={styles.r}>
            <Image
              className={styles.img}
              src={`${AssetsUrl}home/AiShow-bg1.png`}
            />
            <div className={styles.btnBox}>
              <div
                className={styles.btn + " Impact"}
                onClick={() => navigate("/agents")}
              >
                {t("AiShow.2")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AiShow;

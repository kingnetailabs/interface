import styles from "./components.module.scss";
import Image from "@/components/Image";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const TopBanner = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const AssetsUrl = import.meta.env.VITE_APP_ASSETS_URL;

  return (
    <>
      <div
        className={styles.TopBanner}
        style={{
          backgroundImage: `url(${AssetsUrl}home/001.png)`,
        }}
      >
        <video
          className={styles.myVideo}
          id="myVideo"
          width="100%"
          height="100vh"
          autoPlay
          loop
          muted
        >
          <source src={`${AssetsUrl}home/shipin.mov`} type="video/mp4" />
          <Image className={styles.myVideo} src={`${AssetsUrl}home/001.png`} />
        </video>
        <div className={styles.myVideoBg}></div>

        <div className={styles.info}>
          <Image className={styles.logo} src="max-logo.png" />
          <div className={styles.title + " Impact"}>
            RECONSTRUCTING GAME DEVELOPMENT PARADIGMS WITH
            <br /> NATURAL LANGUAGE
          </div>
          <div className={styles.desc}>
            Multi-Agent Collaborative System | Input Instructions → Generate
            Assets → Output Playable Prototype
          </div>
          <div
            className={styles.btn + " Impact"}
            onClick={() => navigate("/ai/Art2d")}
          >
            Get started
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBanner;

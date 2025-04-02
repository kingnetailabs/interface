import styles from "./components.module.scss";
import Image from "@/components/Image";
import { useTranslation } from "react-i18next";
const MemeAi = () => {
  const { t } = useTranslation();
  const AssetsUrl = import.meta.env.VITE_APP_ASSETS_URL;
  return (
    <>
      <div className={styles.MemeAi}>
        <div className={styles.home_page_title + " Impact"}>
          <span>Agent Engine</span>
        </div>
        <div className={styles.descBox}>
          <div
            className={styles.box1}
            style={{
              backgroundImage: `url(${AssetsUrl}home/MemeAi-bg1.png)`,
            }}
          >
            <div className={styles.info}>
              <div className={styles.h1 + " Impact"}>Multi-Agent Matrix</div>
              <div className={styles.desc}>
                Based on generating asset characteristics to build core loops,
                gameplay logic automatic generation framework and intelligent
                testing sandbox.
              </div>
            </div>
            <Image
              className={styles.bg}
              src={`${AssetsUrl}home/MemeAi-bg1-1.png`}
            />
          </div>
          <div
            className={styles.box2}
            style={{
              backgroundImage: `url(${AssetsUrl}home/MemeAi-bg2.png)`,
            }}
          >
            <div className={styles.info}>
              <div className={styles.h1 + " Impact"}>
                Ecological Synergy Network
              </div>
              <div className={styles.desc}>
                Verify multi-agent collaboration protocol (semantic parsing →
                asset generation → engine adaptation), compatible with
                generative networks such as FLUX.
              </div>
            </div>
            <Image
              className={styles.bg}
              src={`${AssetsUrl}home/MemeAi-bg2-1.png`}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default MemeAi;

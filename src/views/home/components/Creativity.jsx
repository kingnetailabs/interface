import styles from "./components.module.scss";
import Image from "@/components/Image";
import { useTranslation } from "react-i18next";
const Creativity = () => {
  const AssetsUrl = import.meta.env.VITE_APP_ASSETS_URL;
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.Creativity}>
        <div className={styles.home_page_title + " Impact"}>
          <span>AI virtual human</span>
        </div>

        <div className={styles.descBox}>
          <div>
            <Image
              className={styles.bg}
              src={`${AssetsUrl}home/Creativity-bg1.png`}
            />
            <div className={styles.info}>
              <div className={styles.h1 + " Impact"}>Agent Interaction Hub</div>
              <div className={styles.desc}>
                Through real-time interpretation of requirements via virtual
                assistants, provide strategic suggestions such as “increasing
                scene detail density” and “optimizing character movement
                fluidity”.
              </div>
            </div>
          </div>
          <div>
            <Image
              className={styles.bg}
              src={`${AssetsUrl}home/Creativity-bg2.png`}
            />
            <div className={styles.info}>
              <div className={styles.h1 + " Impact"}>
                Intelligent NPC Prototype Library
              </div>
              <div className={styles.desc}>
                Based on generated asset characteristics, automatically create
                basic behavior trees and emotional interaction rules.
              </div>
            </div>
          </div>
          <div>
            <Image
              className={styles.bg}
              src={`${AssetsUrl}home/Creativity-bg3.png`}
            />
            <div className={styles.info}>
              <div className={styles.h1 + " Impact"}>
                Scenario-based Creative Sandbox
              </div>
              <div className={styles.desc}>
                Preset generation templates for scenes such as tavern/space
                station/castle, supporting automatic insertion of environmental
                narrative elements.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Creativity;

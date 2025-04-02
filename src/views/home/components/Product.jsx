import styles from "./components.module.scss";
import Image from "@/components/Image";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const Product = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const AssetsUrl = import.meta.env.VITE_APP_ASSETS_URL;
  // const AssetsUrl = '';

  return (
    <>
      <div className={styles.Product}>
        <div className={styles.home_page_title + " Impact"}>
          <span id="IntelligentCentralArchitecture">Intelligent Central Architecture</span>
        </div>

        <div className={styles.descBox}>
          <Image
            className={styles.bg}
            src={`${AssetsUrl}home/Product-bg1-1.png`}
          />

          <div className={styles.info}>
            <div className={styles.item}>
              <Image className={styles.index} src={`${AssetsUrl}home/1.png`} />
              <div className={styles.row}>
                <div className={styles.h1 + " Impact"}>
                  Semantic Cognition Layer
                </div>
                <div className={styles.desc}>
                  <p>
                    Analyze artistic styles, gameplay mechanics, and narrative
                    elements in natural language, and generate structured
                    development blueprints.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.item}>
              <Image className={styles.index} src={`${AssetsUrl}home/2.png`} />

              <div className={styles.row}>
                <div className={styles.h1 + " Impact"}>
                  Collaborative Scheduling Layer
                </div>
                <div className={styles.desc}>
                  <p>
                    Dynamically decompose tasks and allocate them to dedicated
                    agents, intelligently avoiding resource conflicts and
                    logical contradictions.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.item}>
              <Image className={styles.index} src={`${AssetsUrl}home/3.png`} />

              <div className={styles.row}>
                <div className={styles.h1 + " Impact"}>
                  Industrial Execution Layer
                </div>
                <div className={styles.desc}>
                  <p>
                    Convert generated content into engine prefabs, ensuring
                    end-to-end stability through anomaly self-healing
                    mechanisms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;

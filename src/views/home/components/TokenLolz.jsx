import styles from "./components.module.scss";
import Image from "@/components/Image";
import { useTranslation } from "react-i18next";
const TokenLolz = () => {
  const { t } = useTranslation();
  const AssetsUrl = import.meta.env.VITE_APP_ASSETS_URL;
  return (
    <>
      <div className={styles.TokenLolz}>
        <div className={styles.home_page_title + " Impact"}>
          <span>{t("TokenLolz.1")}</span>
        </div>
        <div className={styles.descBox}>
          <Image
            className={styles.bg}
            src={`${AssetsUrl}home/token-lolz.png`}
          />

          <div className={styles.l}>
            <div className={styles.item}>
              <div className={styles.h1 + " Impact"}>{t("TokenLolz.2")}</div>
              <div className={styles.desc}>
                <p>{t("TokenLolz.3")} </p>
                <p>{t("TokenLolz.4")} </p>
              </div>
            </div>

            <div className={styles.item}>
              <div className={styles.h1 + " Impact"}>{t("TokenLolz.5")}</div>
              <div className={styles.desc}>
                <p>{t("TokenLolz.6")} </p>
                <p>{t("TokenLolz.7")} </p>
              </div>
            </div>

            <div className={styles.item}>
              <div className={styles.h1 + " Impact"}>{t("TokenLolz.8")}</div>
              <div className={styles.desc}>
                <p>{t("TokenLolz.9")}</p>
                <p>{t("TokenLolz.10")}</p>
              </div>
            </div>
            <div className={styles.btn + " Impact"}>{t("TokenLolz.11")}</div>
          </div>
          <div className={styles.r}>
            <Image
              className={styles.tokenImg}
              src={`${AssetsUrl}home/token-lolz2.png`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenLolz;

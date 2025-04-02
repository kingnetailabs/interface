import styles from "../components.module.scss";
import { useTranslation } from "react-i18next";
import { ConfigProvider, Checkbox } from "antd";
export default function BgCheckbox(props) {
  const { t } = useTranslation();
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    props.onChange && props.onChange({ isBg: e.target.checked });
  };

  return (
    <>
      <div className={styles["base-checkbox"]}>
        <div className={styles["title"]}>{t("backgroundRemoval")}</div>
        <div className={styles["checkbox-box"]}>
          <div className={styles["subheading"]}>{t("transparentBackground")}</div>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "rgb(254 71 248 / 50%)",
              },
            }}
          >
            <Checkbox onChange={onChange}></Checkbox>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
}

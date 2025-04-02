import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
export default function GiveExample({ tab, options, onChange }) {
  const { t } = useTranslation();
  const [exampleIndex, setExampleIndex] = useState(-1);

  const tabExample = (i) => {
    setExampleIndex(i);
    const { param } = options[i];
    console.log(param);
    onChange &&
      onChange({
        ...param,
      });
  };

  useEffect(() => {
    setExampleIndex(-1);
  }, [tab]);
  return (
    options && (
      <>
        <div className={styles.give_example}>
          <div className={styles.title}>{t("example")}</div>
          <div className={styles.main_box}>
            <div className={styles.example}>
              {options.map((item, i) => {
                return (
                  <div
                    className={`${styles.item} ${
                      exampleIndex == i ? styles.active : ""
                    }`}
                    key={i}
                    onClick={() => tabExample(i)}
                  >
                    {item.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    )
  );
}

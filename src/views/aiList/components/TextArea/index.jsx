import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { Input, ConfigProvider } from "antd";
const { TextArea } = Input;
import { useTranslation } from "react-i18next";

export default function InputField({
  title,
  sub,
  keyName = "prompt",
  val,
  isTips = true,
  options = [],
  required,
  rows = 10,
  onChange,
}) {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(val);
  const [exampleIndex, setExampleIndex] = useState(-1);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    onChange &&
      onChange({
        [keyName]: value,
      });
  };

  const tabExample = (i) => {
    setExampleIndex(i);
    const { value, param } = options[i];
    setInputValue(value);

    onChange &&
      onChange({
        [keyName]: value,
        ...param,
      });
  };

  useEffect(() => {
    if (options.length && exampleIndex >= 0) {
      const value = options[exampleIndex]?.value;
      if (value == inputValue) return;
      setExampleIndex(-1);
    }
  }, [options]);

  useEffect(() => {
    setInputValue(val);
  }, [val]);

  return (
    <>
      <div className={styles["base-input"]}>
        <div
          className={styles["title"]}
          style={isTips ? { marginBottom: 0 } : {}}
        >
          {required && <span className={styles.required}>*</span>}
          {title}
        </div>
        {isTips ? (
          <div className={styles.tips}>* {t("englishOnly")}</div>
        ) : (
          ""
        )}

        <div className={styles["input-box"]}>
          {options.length && sub ? (
            <div className={styles["subheading"]}>{sub}</div>
          ) : (
            ""
          )}

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
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  activeBorderColor: "rgb(254 71 248 / 50%)",
                  hoverBorderColor: "rgb(254 71 248 / 50%)",
                  activeBg: "#23232A",
                },
              },
            }}
          >
            <TextArea
              variant="filled"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Please enter..."
              rows={rows}
            />
          </ConfigProvider>
        </div>
      </div>
    </>
  );
}

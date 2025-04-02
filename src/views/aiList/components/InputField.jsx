import styles from "./components.module.scss";
import { useEffect, useState } from "react";
import { Input, ConfigProvider } from "antd";
const { TextArea } = Input;
import { useTranslation } from "react-i18next";

export default function InputField(props) {
  const { t } = useTranslation();
  const {
    title = "",
    sub = "",
    placeholder = "Please enter...",
    val = "",
    isTips = true,
    options = [],
  } = props;
  const [inputValue, setInputValue] = useState(val);
  const [exampleIndex, setExampleIndex] = useState(-1);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(e.target.value);
    props.onChange &&
      props.onChange({
        prompt: value,
      });
  };

  useEffect(() => {
    props.onChange &&
      props.onChange({
        prompt: val,
      });
  }, []);
  useEffect(() => {
    if (options.length && exampleIndex >= 0) {
      // setExampleIndex(-1);
      setInputValue(options[exampleIndex].value);
    }
  }, [options]);

  const tipsStyle = {
    fontSize: "12px",
    color: "red",
    marginBottom: "15px",
  };

  const tabExample = (i) => {
    setExampleIndex(i);
    const { value, param } = options[i];
    setInputValue(value);
    props.onChange &&
      props.onChange({
        prompt: value,
        ...param,
      });
  };

  return (
    <>
      <div className={styles["base-input"]}>
        <div
          className={styles["title"]}
          style={isTips ? { marginBottom: 0 } : {}}
        >
          {title}
        </div>
        {isTips ? <div style={tipsStyle}>* {t("englishOnly")}</div> : ""}

        <div className={styles["input-box"]}>
          {sub ? <div className={styles["subheading"]}>{sub}</div> : ""}

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
              placeholder={placeholder}
              rows={10}
            />
          </ConfigProvider>
        </div>
      </div>
    </>
  );
}

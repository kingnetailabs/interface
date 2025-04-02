import styles from "../components.module.scss";
import { useEffect, useState } from "react";
import { ConfigProvider, InputNumber, Slider } from "antd";
export default function BgCheckbox({
  title,
  val,
  marks,
  min,
  max,
  keyName,
  percent = true,
  step,
  onChange,
}) {
  const [inputValue, setInputValue] = useState(percent ? val * 100 : val);
  const handleChange = (value) => {
    // if (value <= 0) value = 1;
    setInputValue(value);
    onChange && onChange({ [keyName]: percent ? value / 100 : value });
  };
  useEffect(() => {
    setInputValue(percent ? val * 100 : val);
  }, [val]);

  return (
    <>
      <div className={styles["base-checkbox"]}>
        <div className={styles["title"]}>{title}</div>
        <div className={styles["checkbox-box"]}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "rgb(254 71 248 / 50%)",
              },
            }}
          >
            <Slider
              style={{
                width: "100%",
                marginRight: "40px",
              }}
              marks={marks}
              min={min}
              max={max}
              step={step || 1}
              value={inputValue}
              onChange={handleChange}
            />
            <InputNumber
              min={min}
              max={max}
              value={inputValue}
              onChange={handleChange}
            />
          </ConfigProvider>
        </div>
      </div>
    </>
  );
}

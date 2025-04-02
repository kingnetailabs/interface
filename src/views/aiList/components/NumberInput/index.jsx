import { ConfigProvider, InputNumber } from "antd";
import { useEffect, useState } from "react";
import styles from "../components.module.scss";

export default function NumberInput(props) {
  const { title = "", options = [] } = props;

  const [optionsArr, setOptionsArr] = useState(options);

  const onChange = (i, v) => {
    const newValues = [...optionsArr];
    newValues[i].value = v;
    setOptionsArr(newValues);

    options.map((item, index) => {
      if (index == i) {
        props.onChange &&
          props.onChange({
            [item.keyName]: v,
          });
      }
    });
  };

  useEffect(() => {
    options.map((item) => {
      props.onChange &&
        props.onChange({
          [item.keyName]: item.value,
        });
    });
  }, []);

  return (
    <>
      <div className={styles["base-input"]}>
        <div className={styles["title"]}>{title}</div>
        <div className={styles["input-box"]}>
          <div className={styles["list-item"]}>
            <ConfigProvider
              theme={{
                components: {
                  InputNumber: {
                    activeBorderColor: "rgb(254 71 248 / 50%)",
                    hoverBorderColor: "rgb(254 71 248 / 50%)",
                    activeBg: "#23232A",
                  },
                },
              }}
            >
              {optionsArr.map((item, i) => {
                return (
                  <div className={styles["item"]} key={i}>
                    <div className={styles["subheading"]}>{item.label}</div>

                    <InputNumber
                      style={{ width: "100%" }}
                      size="large"
                      defaultValue={item.value}
                      value={item.value}
                      placeholder={item.placeholder}
                      min={item.min}
                      max={item.max}
                      onChange={(v) => onChange(i, v)}
                    />
                  </div>
                );
              })}
            </ConfigProvider>
          </div>
        </div>
      </div>
    </>
  );
}

import { ConfigProvider, Radio } from "antd";
import styles from "../components.module.scss";
import { useState, useEffect } from "react";
export default function RadioSelect({ title, options = [], val, onChange }) {
  const [radioVal, setRadioVal] = useState(val);

  const getParam = (value) => {
    options.map((item, i) => {
      if (i == value) {
        onChange && onChange(item.param);
      }
    });
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setRadioVal(value);
    getParam(value);
  };
  useEffect(() => {
    if (!val) {
      setRadioVal(0);
      getParam(0);
    }
  }, []);

  return (
    <>
      <div className={styles["base-radio"]}>
        <div className={styles["title"]}>{title}</div>
        <div className={styles["radio-box"]}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "rgb(254 71 248 / 50%)",
              },
            }}
          >
            <Radio.Group
              value={radioVal}
              onChange={handleChange}
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              {options.map((item, i) => {
                return (
                  <div className={styles["item"]} key={i}>
                    <Radio value={i}>{item.label}</Radio>
                  </div>
                );
              })}
            </Radio.Group>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
}

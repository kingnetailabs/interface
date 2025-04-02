import { useEffect, useState } from "react";
import styles from "./index.module.scss";

import { Cascader, ConfigProvider } from "antd";

function getPromptStrategyByPath(options, path) {
  const [topLevelIndex, subLevelIndex] = path;
  if (!options[topLevelIndex]) {
    return {};
  } else if (options[topLevelIndex].children) {
    return options[topLevelIndex].children[subLevelIndex].param;
  } else {
    return options[topLevelIndex].param;
  }
}

export default function SingleSelect({
  title,
  sub,
  options,
  keyName = "types",
  required,
  onChange,
  val,
}) {
  const [selectVal, setSelectVal] = useState(val);

  const hasChildren = (options) => {
    for (const item of options) {
      if (item.children && item.children.length > 0) {
        return true;
      }
    }
    return false;
  };

  const handleChange = (value) => {
    setSelectVal(value);
    const promptStrategy = getPromptStrategyByPath(options, value);
    onChange &&
      onChange({
        [keyName]: value,
        ...promptStrategy,
      });
  };

  useEffect(() => {
    let result = val;
    if (!val) {
      result = hasChildren(options) ? [0, 0] : [0];
      setSelectVal(result);
    }

    const promptStrategy = getPromptStrategyByPath(options, result);
    onChange &&
      onChange({
        [keyName]: result,
        ...promptStrategy,
      });
  }, [val]);

  return (
    <>
      <div className={styles["base-select"]}>
        <div className={styles["title"]}>
          {required && <span className={styles.required}>*</span>}
          {title}
        </div>

        <div className={styles["select-box"]}>
          {sub && <div className={styles["subheading"]}>{sub}</div>}
          <ConfigProvider
            theme={{
              token: {
                colorBgContainer: "#23232A",
                colorPrimary: "rgb(254 71 248 / 50%)",
              },
              components: {
                Cascader: {
                  optionSelectedBg: "rgb(254 71 248 / 50%)",
                  controlWidth: "100%",
                },
              },
            }}
          >
            <Cascader
              options={options}
              allowClear={false}
              onChange={handleChange}
              placeholder="Please select"
              value={selectVal}
            />
          </ConfigProvider>
        </div>
      </div>
    </>
  );
}

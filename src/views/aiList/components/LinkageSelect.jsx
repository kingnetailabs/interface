import styles from "./components.module.scss";

import { Cascader, ConfigProvider } from "antd";

function getPromptStrategyByPath(options, path) {
  const [topLevelIndex, subLevelIndex] = path;

  if (options[topLevelIndex].children) {
    return options[topLevelIndex].children[subLevelIndex].param;
  } else {
    return options[topLevelIndex].param;
  }
}

export default function SingleSelect(props) {
  const { title = "", sub = "", options = [] } = props;

  const handleChange = (value) => {
    const promptStrategy = getPromptStrategyByPath(options, value);
    props.onChange &&
      props.onChange({
        types: value[0], // 返回大选项类型
        ...promptStrategy,
      });
  };

  return (
    <>
      <div className={styles["base-select"]}>
        <div className={styles["title"]}>{title}</div>

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
            />
          </ConfigProvider>
        </div>
      </div>
    </>
  );
}

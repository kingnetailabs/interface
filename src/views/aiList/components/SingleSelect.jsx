import styles from "./components.module.scss";

import { Select, ConfigProvider } from "antd";

export default function SingleSelect(props) {
  const { title = "", sub = "", options = [] } = props;

  const handleChange = (value) => {
    const option = options.find((fruit) => fruit.value == value);
    props.onChange && props.onChange(option.param);
  };

  return (
    <>
      <div className={styles["base-select"]}>
        <div className={styles["title"]}>{title}</div>
        <div className={styles["select-box"]}>
          {sub ? <div className={styles["subheading"]}>{sub}</div> : ""}

          <ConfigProvider
            theme={{
              components: {
                Select: {
                  optionSelectedBg: "rgb(254 71 248 / 50%)",
                  activeBorderColor: "rgb(254 71 248 / 50%)",
                  hoverBorderColor: "rgb(254 71 248 / 50%)",
                  selectorBg: "#23232A",
                },
              },
            }}
          >
            <Select
              style={{
                width: "100%",
              }}
              options={options}
              onChange={handleChange}
              placeholder="Please select"
            />
          </ConfigProvider>
        </div>
      </div>
    </>
  );
}

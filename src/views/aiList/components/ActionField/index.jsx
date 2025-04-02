import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, App, ConfigProvider } from "antd";
import styles from "./index.module.scss";
import { deleteResource } from "@/api/assetLibrary";

export default function ActionField({ data, upData }) {
  const { message } = App.useApp();

  const del = async () => {
    const res = await deleteResource({
      id: data.id,
    });

    if (!res.code) {
      message.success("success");
      upData && upData();
    } else {
      message.error("failed");
    }
  };

  const down = () => {
    // 创建一个临时的<a>标签元素
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = data.url;

    // 触发点击事件以下载文件
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultActiveBorderColor: "rgb(254 71 248 / 50%)",
            defaultActiveColor: "rgb(254 71 248 / 50%)",
            defaultHoverBorderColor: "rgb(254 71 248 / 50%)",
            defaultHoverColor: "rgb(254 71 248 / 50%)",
          },
        },
      }}
    >
      <div className={styles.controls}>
        <div className={styles.del} onClick={del}>
          <Button icon={<DeleteOutlined />} />
        </div>
        <div className={styles.down} onClick={down}>
          <Button icon={<DownloadOutlined />} />
        </div>
      </div>
    </ConfigProvider>
  );
}

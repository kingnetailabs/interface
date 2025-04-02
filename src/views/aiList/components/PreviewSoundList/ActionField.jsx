import { ConfigProvider, App, Button } from "antd";
import { DownloadOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteResource } from "@/api/assetLibrary";
import { useTranslation } from "react-i18next";

export default function DownloadBtn({ delID, soundUrl, upData }) {
  const { message } = App.useApp();
  const { t } = useTranslation();

  const downloadBlob = async () => {
    let regex = /\/([^\/]+)\.([^\/]+)$/;
    let match = soundUrl.match(regex);
    let fileNameOnly, fileExtension;
    if (match) {
      fileNameOnly = match[1];
      fileExtension = match[2];
    }
    const response = await fetch(soundUrl);
    const blob = await response.blob();
    const urlObject = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = urlObject;
    a.download = match[0];
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(urlObject);
    }, 0);
  };

  const del = async () => {
    const res = await deleteResource({
      id: delID,
    });

    if (!res.code) {
      message.success(t("deleteSuccess"));
      upData && upData();
    } else {
      message.error(t("deleteFailed"));
    }
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
      <Button icon={<DeleteOutlined />} onClick={del} />
      <Button icon={<DownloadOutlined />} onClick={downloadBlob} />
    </ConfigProvider>
  );
}

import { useTranslation } from "react-i18next";
import { ConfigProvider, App, Button } from "antd";
import { getUser } from "@/api/ai";
import buySubscribe from "@/components/Subscribe";
export default function SubBtn({ onClick }) {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const { SubscribeModal } = buySubscribe();

  const submit = async () => {
    const token = localStorage.getItem("token");
    if (!token) return message.error(t("connectWalletFirst"));

    const res = await getUser();

    if (!res.data.comfyui_limit) {
      return SubscribeModal();
    }

    onClick && onClick();
  };

  return (
    <>
      <div className="submit-btn">
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
          <Button onClick={submit} htmlType="submit" block={true}>
            {t("generate")}
          </Button>
        </ConfigProvider>
      </div>
    </>
  );
}

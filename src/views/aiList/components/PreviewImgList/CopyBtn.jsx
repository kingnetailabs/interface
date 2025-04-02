import { App, ConfigProvider, Button } from "antd";
import { useTranslation } from "react-i18next";

const Btn = ({ text }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const handleCopyModern = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      message.success(t("replicationSuccessful"));
    } catch (err) {
      console.error("Failed to copy text: ", err);
      message.success(t("replicationFailure"));
    }
  };

  return (
    <div style={{ marginTop: "5px" }}>
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
        <Button onClick={() => handleCopyModern(text)} size="small">
          {t('copyKeywords')}
        </Button>
      </ConfigProvider>
    </div>
  );
};

export default Btn;

import "./components.scss";
import styles from "./components.module.scss";
import { useState, useEffect } from "react";
import { Select, Image, ConfigProvider, message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import useUploadFile from "@/hooks/useUploadFile";
import { t } from "i18next";

export default function UploadImg(props) {
  const { title = "", sub = "", options = [], isSelect = true } = props;

  const { uploading, fileUrl, setFileUrl, handleComfyUIUpload } =
    useUploadFile();
  const [imgName, setImgName] = useState("");

  const beforeUpload = (file) => {
    setImgName(file.name);
    // 上传之前的条件
    const isJpgOrPng = /image\/(jpeg|png)/.test(file.type);
    if (!isJpgOrPng) {
      message.error(t("uploadImageFormat"));
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error(t("imageSizeExceeded"));
    }
    if (isJpgOrPng && isLt10M) {
      props.onFile && props.onFile(file);
    }
    return isJpgOrPng && isLt10M;
  };

  // 垫图select选项回调
  const handleChange = (value) => {
    const option = options.find((fruit) => fruit.value == value);
    props.onChange(option.param);
  };
  // 垫图上传监听
  useEffect(() => {
    if (!fileUrl) return;
    setFileUrl(fileUrl);

    props.onChange &&
      props.onChange({
        [props.isSelect ? "image" : "pose"]: imgName,
        [props.isSelect ? "imageFileUrl" : "poseFileUrl"]: fileUrl,
      });

    props.onChangeFileUrl &&
      props.onChangeFileUrl({
        fileUrl,
      });
  }, [fileUrl]);

  // 上传自定义按钮
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        <p style={{ fontSize: "12px" }}>
          {t("acceptedFileTypes")}
          <br />
          {t("maxFileSize")}
        </p>
      </div>
    </button>
  );

  // 删除图片

  const delImg = () => {
    console.log("", fileUrl, uploading);

    setImgName("");
    setFileUrl("");
    props.onChange &&
      props.onChange({
        [props.isSelect ? "image" : "pose"]: "",
      });
  };

  return (
    <>
      <div className={styles["base-upload"]}>
        <div className={styles["title"]}>{title}</div>
        <div className={styles["main-box"]}>
          {isSelect && (
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
          )}

          <div className={styles["upload-box"]}>
            <div className={styles["avatar-uploader"]}>
              <div className="upload-box">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  customRequest={handleComfyUIUpload}
                >
                  {!(fileUrl && !uploading) && uploadButton}
                </Upload>

                {fileUrl && !uploading && (
                  <div className={styles["upload-box-img"]}>
                    <Image src={fileUrl} preview={false} />
                    <div className={styles.preview}>
                      <div className={styles.del} onClick={delImg}>
                        <DeleteOutlined />
                        {t("Delete")}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

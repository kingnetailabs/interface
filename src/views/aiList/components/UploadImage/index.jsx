import "../components.scss";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import { message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import useUploadFile from "@/hooks/useUploadFile";
import { useTranslation } from "react-i18next";
import Image from "@/components/Image";

export default function UploadImg({
  title,
  keyName = "image",
  defaultVal = "",
  required,
  onChange,
}) {
  const { t } = useTranslation();

  const { uploading, fileUrl, setFileUrl, handleComfyUIUpload } =
    useUploadFile();

  const [defaultImgName, setDefaultImgName] = useState(defaultVal);
  const [imgName, setImgName] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [defaultImg, setDefaultImg] = useState(fileUrl);

  const beforeUpload = (file) => {
    setImgName(file.name);

    const isJpgOrPng = /image\/(jpeg|png|webp)/.test(file.type);
    if (!isJpgOrPng) {
      message.error(t("uploadImageFormat"));
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error(t("imageSizeExceeded"));
    }
    setImgFile(file);
    return isLt10M;
  };

  useEffect(() => {
    if (!fileUrl) return;
    setFileUrl(fileUrl);
    setDefaultImg(fileUrl);
    onChange &&
      onChange({
        [`${keyName}FileUrl`]: fileUrl,
        [`${keyName}File`]: imgFile,
        [keyName]: imgName,
      });
  }, [fileUrl]);

  const delImg = () => {
    setImgName("");
    setFileUrl("");
    setDefaultImg("");
    setDefaultImgName("");
    onChange &&
      onChange({
        [`${keyName}FileUrl`]: "",
        [`${keyName}File`]: "",
        [keyName]: "",
      });
  };

  useEffect(() => {
    // const containsDemoBg = defaultVal.includes("1h9btaa3sbr.png");
    const containsDemoBg = defaultVal.includes("demoBg");

    if (containsDemoBg) {
      setDefaultImgName(defaultVal);
      setImgName("");
      setImgFile("");
      setDefaultImg("");

      onChange &&
        onChange({
          [`${keyName}FileUrl`]: "",
          [`${keyName}File`]: "",
          [keyName]: defaultVal,
        });
    }
  }, [defaultVal]);

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

  return (
    <>
      <div className={styles["base-upload"]}>
        <div className={styles["title"]}>
          {required && <span className={styles.required}>*</span>}
          {title}
        </div>
        <div className={styles["main-box"]}>
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
                  {!defaultImg && !defaultImgName && uploadButton}
                </Upload>

                {(defaultImg || defaultImgName) && (
                  <div className={styles["upload-box-img"]}>
                    {defaultImg && (
                      <>
                        <Image src={defaultImg} preview={false} />
                      </>
                    )}
                    {defaultImgName && (
                      <Image
                        src={`aiList/demoImg/${defaultImgName}`}
                        preview={false}
                      />
                    )}

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

// UploadFile.js
import React, { useState, useCallback } from "react";
import { Upload, message } from "antd";
import { upload_files } from "@/api";
import { upload_image, view } from "@/api/ai.js";

const UploadFile = ({ getUploadFile, loading, type = 1, children }) => {
  const [uploading, setUploading] = useState(false);

  const handleUploadFile = async ({ file }) => {
    if (loading !== undefined) {
      setUploading(true);
    }

    try {
      const formData = new FormData();
      formData.append(type === 1 ? "files" : "file", file);

      const uploadFunction = type === 1 ? upload_files : upload_image;
      const res = await uploadFunction(formData);

      if (type !== 1 && res.data.code === 0) {
        setUploading(false);
        return getUploadFile(Promise.resolve(res.data));
      }

      setUploading(false);

      if (res.data?.num_files_succeeded === 1) {
        return getUploadFile(Promise.resolve(res.data.successful_file_urls[0]));
      } else {
        return getUploadFile(Promise.reject(res.data.msg));
      }
    } catch (error) {
      setUploading(false);
      return getUploadFile(Promise.reject(error));
    }
  };

  return (
    <Upload
      customRequest={handleUploadFile}
      showUploadList={false}
      disabled={uploading}
    >
      {children || (
        <div>{uploading ? "Uploading..." : "Click or Drag file to upload"}</div>
      )}
    </Upload>
  );
};

export default UploadFile;

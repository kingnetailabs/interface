import { useState } from "react";
import { upload_image, upload_animimage, uploadMask } from "@/api/ai.js";
import { upload_files } from "@/api";

const useUploadFile = () => {
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  const handleUploadImage = async ({ file }) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("files", file);
      const res = await upload_files(formData);
      // setUploading(false);
      if (res.code != 0) {
        return Promise.reject(new Error(res.msg));
      }
      if (res.data.num_files_succeeded == 0) {
        return Promise.reject(new Error(res.data.message));
      }

      setFileUrl(res.data.successful_file_urls[0]);

      return Promise.resolve(res.data.successful_file_urls[0]);
    } catch (error) {
      // setUploading(false);
      return Promise.reject(error);
    } finally {
      setUploading(false);
    }
  };

  const handleComfyUIUpload = async ({ file }) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData);

      const res = await upload_image(formData);
      if (res.code != 0) {
        return Promise.reject(new Error(res.msg));
      }
      if (res.data.num_files_succeeded == 0) {
        return Promise.reject(new Error(res.data.message));
      }
      setFileUrl(res.data.img);
      return Promise.resolve(res.data.img);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setUploading(false);
    }
  };

  const handleUploadPhaserImage = async ({ file }) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("files", file);
      const res = await upload_animimage(formData);
      // setUploading(false);
      if (res.code != 0) {
        return Promise.reject(new Error(res.msg));
      }
      if (res.data.num_files_succeeded == 0) {
        return Promise.reject(new Error(res.data.message));
      }
      setFileUrl(res.data);
      return Promise.resolve(res.data);
    } catch (error) {
      // setUploading(false);
      return Promise.reject(error);
    } finally {
      setUploading(false);
    }
  };

  const handleUploadMask = async (data) => {
    // console.log(data)

    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("type", data.type);
    formData.append("subfolder", data.subfolder);
    formData.append("original_ref", JSON.stringify(data.original_ref));

    const res = await uploadMask(formData);

    if (res.code != 0) {
      return Promise.reject(res);
    }
    return Promise.resolve(res.data);
  };

  return {
    handleComfyUIUpload,
    handleUploadImage,
    handleUploadPhaserImage,
    handleUploadMask,
    uploading,
    fileUrl,
    setFileUrl,
  };
};

export default useUploadFile;

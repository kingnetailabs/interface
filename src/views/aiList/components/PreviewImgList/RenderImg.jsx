import { Image } from "antd";
import styles from "./PreviewImgList.module.scss";
import loader from "@/assets/loader.gif";
export default function RenderImg({
  url,
  imageRender,
  width = "100%",
  height = "auto",
  style,
}) {
  const imgLoad = (
    <div className={styles.loader_img}>
      <img style={{ width: "30px", height: "30px" }} src={loader} />
    </div>
  );
  return (
    <Image
      width={width}
      height={height}
      style={style}
      src={url}
      placeholder={imgLoad}
      preview={{
        destroyOnClose: true,
        imageRender,
      }}
    />
  );
}

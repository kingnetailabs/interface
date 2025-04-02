import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import Image from "../Image";
const Solid = ({
  className = styles["solid-wrap"],
  borderClassName = styles.border,
  centerClassName = styles.center,
  style,
}) => {
  return (
    <div className={className} style={style}>
      <div className={borderClassName}></div>
      <div className={centerClassName}>
        <Image src="home/border-icon.png" />
      </div>
      <div className={borderClassName}></div>
    </div>
  );
};

export default Solid;

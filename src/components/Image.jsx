import React, { useState, useEffect } from "react";

export default function Image({
  src = "",
  className = "",
  style = {
    objectFit: "cover",
  },
  width = "",
  height = "",
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  alt,
}) {
  const [finalStyle, setFinalStyle] = useState(style);

  useEffect(() => {
    const newStyle = { ...style };
    if (width) {
      newStyle.width = width;
    }
    if (height) {
      newStyle.height = height;
    }
    setFinalStyle(newStyle);
  }, []);

  function getAssetsImages(path) {
    // 是否外链
    const regex =
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|ftp:\/\/|www\.)/;
    if (!regex.test(path)) {
      return new URL(`/src/assets/${path}`, import.meta.url).href;
    }
    return path;
  }

  const handleError = (e) => {
    e.target.src = getAssetsImages("default.png");
  };

  return (
    <img
      src={getAssetsImages(src)}
      className={className}
      style={finalStyle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      alt={alt}
      onError={handleError}
    ></img>
  );
}

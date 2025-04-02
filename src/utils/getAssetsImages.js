export default function getAssetsImages(path) {
  // 是否外链
  const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|ftp:\/\/|www\.)/;
  if (!regex.test(path)) {
    return new URL(`/src/assets/${path}`, import.meta.url).href; //本地文件路径
  }
  return path;
}

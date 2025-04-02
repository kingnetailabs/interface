export default function setRem() {
  const width = document.documentElement.clientWidth; // 当前设备宽度
  let fontSize = 16; // 默认字体大小

  if (width <= 1920 && width > 750) {
    // 如果屏幕宽度在750px到1920px之间，则按比例计算根元素的字体大小
    const designWidth = 1920; // 设计稿宽度
    const radio = width / designWidth; // 计算比例
    fontSize = 16 * radio; // 根据比例计算字体大小
  }

  // 设置根元素的字体大小
  document.documentElement.style.fontSize = fontSize + "px";
}

setRem();
window.addEventListener("resize", setRem);

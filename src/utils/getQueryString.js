//获取url参数
export default function getQueryString(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
  if (window.location.href.split("?").length > 1) {
    for (let i = 1; i < window.location.href.split("?").length; i++) {
      const r = window.location.href.split("?")[i].match(reg);
      if (r != null) return unescape(r[2].split("#")[0]);
    }
    return null;
  }
  return false;
}

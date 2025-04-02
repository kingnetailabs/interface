// import { ElMessage } from "element-plus";
// import i18n from "@/i18n/index";

// export default function copy(text) {
//   if (!text) {
//     ElMessage.error(i18n.global.t("replicationFailure"));
//     return Promise.reject();
//   }
//   let textareaC = document.createElement("textarea");
//   textareaC.setAttribute("readonly", "readonly"); //设置只读属性防止手机上弹出软键盘
//   textareaC.value = text.toString();
//   document.body.appendChild(textareaC); //将textarea添加为body子元素
//   textareaC.select();
//   document.execCommand("copy");
//   document.body.removeChild(textareaC); //移除DOM元素
//   ElMessage.success(i18n.global.t("replicationSuccessful"));
//   return Promise.resolve();
// }

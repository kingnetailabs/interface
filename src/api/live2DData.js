import { histoireJson } from "@/assets/model/init";

const baseURL = "https://api.sakta.top";

// List of live2D character models with their configurations
export const live2dListData = [
  {
    id: 0,
    avatar: baseURL + "/profile/upload/2024/01/12/hir_20240112141704A003.png",
    role_id: "110",
    height: "355",
    width: "256",
    scale: 0.3,
    x: -50,
    idle: "idle",
    talk: ["talk", "flick_head"],
    role_url: histoireJson,
    role_name: "Isterwar",
    role_info: "A knowledgeable and capable virtual assistant character..."
  },
  {
    id: 999,
    avatar: "",
    role_name: "GPT",
    role_info: "Please do your best to solve the user's problems.",
    role_url: ""
  },
  {
    id: 1,
    avatar: baseURL + "/profile/upload/2024/01/12/qiana_20240112141729A004.png",
    role_id: "285",
    height: "375",
    width: "256",
    scale: 0.1,
    x: 0,
    idle: "activity",
    talk: ["tap_face", "tap_leg"],
    role_url: "https://cdn.jsdelivr.net/gh/Eikanya/Live2d-model/Kiana/model.json",
    role_name: "Kiana",
    role_info: "A proud and self-conscious girl character with a kind heart..."
  },
  {
    id: 2,
    avatar: baseURL + "/profile/upload/2024/01/12/xier_20240112141758A005.png",
    role_id: "252",
    height: "375",
    width: "256",
    scale: 0.15,
    x: 0,
    idle: "afternoon",
    talk: ["idle", "mail", "shake"],
    role_url: "https://cdn.jsdelivr.net/gh/Eikanya/Live2d-model/xier/model.json",
    role_name: "Seele",
    role_info: "A shy but warm-hearted girl character..."
  },
  {
    id: 3,
    avatar: baseURL + "/profile/upload/2024/01/12/bachongy_20240112141814A006.png",
    role_id: "240",
    height: "395",
    width: "320",
    scale: 0.12,
    x: -100,
    idle: "activity",
    talk: ["flick_head", "tap_leg", "born"],
    role_url: "https://cdn.jsdelivr.net/gh/Eikanya/Live2d-model/yazakura/model.json",
    role_name: "Yae Sakura",
    role_info: "A gentle yet strong-willed female character who has endured hardships..."
  },
  {
    id: 4,
    avatar: baseURL + "/profile/upload/2024/01/12/lita_20240112141830A007.png",
    role_id: "232",
    height: "385",
    width: "256",
    scale: 0.33,
    x: -150,
    idle: "activity",
    talk: ["flick_head", "tap_leg", "born"],
    role_url: "https://cdn.jsdelivr.net/gh/Eikanya/Live2d-model/Lita/model.json",
    role_name: "Rita",
    role_info: "A mischievous yet caring character who teases but protects those she loves..."
  },
  {
    id: 5,
    avatar: "https://www.freeimg.cn/i/2024/01/31/65ba439188c9c.png",
    role_name: "English Translator & Improver",
    role_info: "Acts as an English translator, spelling corrector and improver...",
    role_url: ""
  },
  {
    id: 6,
    avatar: "https://www.freeimg.cn/i/2024/01/31/65ba4464ebb1f.png",
    role_name: "Interviewer",
    role_info: "Acts as an interviewer for specified job positions...",
    role_url: ""
  },
  {
    id: 7,
    avatar: "https://www.freeimg.cn/i/2024/01/31/65ba44e475b45.png",
    role_name: "Midjourney Prompt Generator",
    role_info: "Generates creative prompts for the Midjourney AI art program...",
    role_url: ""
  },
  {
    id: 8,
    avatar: "https://www.freeimg.cn/i/2024/02/03/65be00fbecbf5.png",
    role_name: "Xiaohongshu Content Creator",
    role_info: "Creates posts in Xiaohongshu (Little Red Book) style with emojis and images...",
    role_url: ""
  }
];
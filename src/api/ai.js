import request from "@/plugins/request";

// Chat completion
export function chat(data, cancelTokenSource) {
  return request({
    url: "/v1/h5/api/chatgpt/chat/completions",
    method: "POST",
    data,
    cancelToken: cancelTokenSource.token, // Pass CancelToken to request config
  });
}

// Get models list
export function models(params) {
  return request({
    url: "/v1/models",
    method: "GET",
    params,
  });
}

// Get sidebar configuration data
export function find(params) {
  return request({
    url: "/v1/h5/api/assistant/find",
    method: "GET",
    params,
  });
}

// Save assistant
export function save(data) {
  return request({
    url: "/v1/h5/api/assistant/save",
    method: "POST",
    data,
  });
}

// Get default settings
export function defaults(params) {
  return request({
    url: "/v1/h5/api/assistant/defaults",
    method: "GET",
    params,
  });
}

// Text to image generation
export function txt2img(data) {
  return request({
    url: "/v1/h5/api/img/txt2img",
    method: "POST",
    data,
  });
}

// Text to speech (TTS) v3
export function tts(data) {
  return request({
    url: "/v1/h5/api/audio/ttsV3",
    method: "POST",
    data,
  });
}

// Text to speech (TTS) v2
export function ttsV2(data) {
  return request({
    url: "/v1/h5/api/audio/ttsV2",
    method: "POST",
    data,
  });
}

// Get custom assistant list
export function assistantCustomfind(params) {
  return request({
    url: "/v1/h5/api/assistant/customfind",
    method: "GET",
    params: params,
  });
}

// Get assistant by ID
export function assistantFindbyid(params) {
  return request({
    url: "/v1/h5/api/assistant/findbyid",
    method: "GET",
    params: params,
  });
}

// Get user information
export function getUser() {
  return request({
    url: "/v1/h5/api/user/get",
    method: "GET",
  });
}

// Background music generation
export function audioGen(data) {
  return request({
    url: "/v1/h5/api/audio/gen",
    method: "POST",
    data: data,
  });
}

// TTS generation
export function ttsGen(data) {
  return request({
    url: "/v1/h5/api/tts/gen",
    method: "POST",
    data: data,
  });
}

// Delete assistant
export function assistantDelete(data) {
  return request({
    url: "/v1/h5/api/assistant/delete",
    method: "POST",
    data,
  });
}

// Save custom assistant
export function assistantCustomsave(data) {
  return request({
    url: "/v1/h5/api/assistant/customsave",
    method: "POST",
    data,
  });
}

// Save custom assistant draft
export function assistantCustomDraftsave(data) {
  return request({
    url: "/v1/h5/api/assistant/custom_draftsave",
    method: "POST",
    data,
  });
}

// Like assistant
export function assistantLike(data) {
  return request({
    url: "/v1/h5/api/assistant/like",
    method: "POST",
    data,
  });
}

// Follow assistant
export function assistantFollow(data) {
  return request({
    url: "/v1/h5/api/assistant/follow",
    method: "POST",
    data,
  });
}

// Delete user chat history
export function userHistorydel(data) {
  return request({
    url: "/v1/h5/api/user/historydel",
    method: "POST",
    data,
  });
}

// Get user chat history list
export function userHistorylist(params) {
  return request({
    url: "/v1/h5/api/user/historylist",
    method: "GET",
    params,
  });
}

// Get all assistant groups
export function assistantAllFind(params) {
  return request({
    url: "/v1/h5/api/assistant/all_find",
    method: "GET",
    params,
  });
}

// Get my assistants
export function assistantMine(params) {
  return request({
    url: "/v1/h5/api/assistant/mine",
    method: "GET",
    params,
  });
}

// Get image models list
export function imgSdmode(params) {
  return request({
    url: "/v1/h5/api/img/sdmode",
    method: "GET",
    params,
  });
}

// Get assistant templates
export function assistantTmplFind(params) {
  return request({
    url: "/v1/h5/api/assistant_tmpl/find",
    method: "GET",
    params,
  });
}

// Get voice models
export function voiceModelFind(params) {
  return request({
    url: "/v1/h5/api/voice_model/find",
    method: "GET",
    params,
  });
}

// Get AI agent assistants
export function assistantAiagent(params) {
  return request({
    url: "/v1/h5/api/assistant/aiagent",
    method: "GET",
    params,
  });
}

// Generate image
export function generate_role(data) {
  return request({
    url: "/v1/h5/api/comfyui/generate",
    method: "POST",
    data,
  });
}

// Get image generation history
export function get_history(params) {
  return request({
    url: "/v1/h5/api/comfyui/get_history",
    method: "GET",
    params,
  });
}

// View generated image
export function view(params) {
  return request({
    url: "/v1/h5/api/comfyui/view",
    method: "GET",
    params,
  });
}

// Upload image for img2img
export function upload_image(data) {
  return request({
    url: "/v1/h5/api/comfyui/upload/image",
    method: "POST",
    data,
  });
}

// Game configuration
export function config(data) {
  return request({
    url: "/v1/h5/api/game/config",
    method: "POST",
    data,
  });
}

// Set configuration
export function setconf(data) {
  return request({
    url: "v1/h5/api/pharse/setconf",
    method: "POST",
    data,
  });
}

// Upload animation image
export function upload_animimage(data) {
  return request({
    url: "/v1/h5/api/pharse/uploadimg",
    method: "POST",
    data,
  });
}

// Upload mask for inpainting
export function uploadMask(data) {
  return request({
    url: "/v1/h5/api/comfyui/upload/mask",
    method: "POST",
    data,
  });
}

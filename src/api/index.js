import request from "@/plugins/request";

// User login
export function userLogin(data) {
  return request({
    url: "/v1/h5/api/user/login",
    method: "POST",
    data,
  });
}

// Get user information
export function userinfo() {
  return request({
    url: "/v1/h5/api/user/get",
    method: "GET",
  });
}

// Get user level information
export function levelinfo() {
  return request({
    url: "/v1/h5/api/user/levelinfo",
    method: "GET",
  });
}

// Exchange treasure box
export function exchangebox(data) {
  return request({
    url: "/v1/h5/api/user/exchangebox",
    method: "POST",
    data,
  });
}

// User tasks
export function usertask(data) {
  return request({
    url: "/v1/h5/api/user/usertask",
    method: "POST",
    data,
  });
}

// Bind invitation code
export function inviteuser(data) {
  return request({
    url: "/v1/h5/api/user/inviteuser",
    method: "POST",
    data,
  });
}

// Check Discord membership status
export function discord(params) {
  return request({
    url: "/v1/h5/api/discord/discord",
    method: "GET",
    params,
  });
}

// Twitter retweet verification
export function user_retweet(params) {
  return request({
    url: "/v1/h5/api/tw/user_retweet",
    method: "GET",
    params,
  });
}

// Twitter follow verification
export function user_follows(params) {
  return request({
    url: "/v1/h5/api/tw/user_follows",
    method: "GET",
    params,
  });
}

// Check Telegram username membership
export function checktg(params) {
  return request({
    url: "/v1/h5/api/tg/checktg",
    method: "GET",
    params,
  });
}

// Bind Telegram username
export function bindusername(data) {
  return request({
    url: "/v1/h5/api/tg/bindusername",
    method: "POST",
    data,
  });
}

// Set username
export function setusername(data) {
  return request({
    url: "/v1/h5/api/user/setusername",
    method: "POST",
    data,
  });
}

// Update user avatar
export function setavatar(data) {
  return request({
    url: "/v1/h5/api/user/setavatar",
    method: "POST",
    data,
  });
}

// Upload files
export function upload_files(data) {
  return request({
    url: "/v1/h5/api/file/upload_files",
    method: "POST",
    data,
  });
}

// Update user information (owner)
export function save_by_owner(data) {
  return request({
    url: "/v1/h5/api/user/save_by_owner",
    method: "POST",
    data,
  });
}

// Get subscription packages
export function getSubscriptionPackage(params) {
  return request({
    url: "/v1/h5/api/kingnet/package",
    method: "GET",
    params,
  });
}
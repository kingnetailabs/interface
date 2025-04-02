import request from "@/plugins/request";

// Get configuration
export function getConfig(params) {
  return request({
    url: "/v1/h5/api/config/get",
    method: "GET",
    params,
  });
}

// Save configuration (admin only)
export function adminSaveConfig(data) {
  return request({
    url: "/v1/h5/api/config/admin_save",
    method: "POST",
    data,
  });
}
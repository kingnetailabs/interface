import request from "@/plugins/request";

// Save resource
export function saveResource(data) {
  return request({
    url: "/v1/h5/api/resource/save",
    method: "POST",
    data,
  });
}

// Find resources
export function findResource(params) {
  return request({
    url: "/v1/h5/api/resource/find", 
    method: "GET",
    params,
  });
}

// Count resources by category IDs
export function countByCategoryIds(params) {
  return request({
    url: "/v1/h5/api/resource/countByCategoryIds",
    method: "GET", 
    params,
  });
}

// Delete resource
export function deleteResource(data) {
  return request({
    url: "v1/h5/api/resource/delete",
    method: "POST",
    data,
  });
}
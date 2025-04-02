import request from "@/plugins/request";

// Query service/task list
export function find(params) {
  return request({
    url: "/v1/h5/api/work/find",
    method: "GET",
    params,
  });
}

// Save service/task
export function save(data) {
  return request({
    url: "/v1/h5/api/work/save",
    method: "POST",
    data,
  });
}

// Bookmark/star a service/task
export function star(data) {
  return request({
    url: "/v1/h5/api/work/star",
    method: "POST",
    data,
  });
}

// Get single task details
export function get(params) {
  return request({
    url: "/v1/h5/api/work/get",
    method: "GET",
    params,
  });
}

// Join a service/task
export function join(data) {
  return request({
    url: "/v1/h5/api/work/join",
    method: "POST",
    data,
  });
}

// Get count statistics dashboard
export function count_dashboard(params) {
  return request({
    url: "/v1/h5/api/work/count_dashboard",
    method: "GET",
    params,
  });
}

// Get application status counts for services/tasks (dashboard)
export function join_work_count_dashboard(params) {
  return request({
    url: "/v1/h5/api/join_work/count_dashboard",
    method: "GET",
    params,
  });
}

// (Admin) Query service/task application list
export function join_work_find(params) {
  return request({
    url: "/v1/h5/api/join_work/find",
    method: "GET",
    params,
  });
}

// Query services I've joined
export function get_by_work_id(params) {
  return request({
    url: "/v1/h5/api/join_work/get_by_work_id",
    method: "GET",
    params,
  });
}

// Update participation status
export function update_process_status(data) {
  return request({
    url: "/v1/h5/api/join_work/update_process_status",
    method: "POST",
    data,
  });
}

// Query service/task participation records
export function find_record(params) {
  return request({
    url: "/v1/h5/api/join_work/find_record",
    method: "GET",
    params,
  });
}

// Get message board list (transactions)
export function message_board_find(params) {
  return request({
    url: "/v1/h5/api/message_board/find",
    method: "GET",
    params,
  });
}

// Send message to board (transactions)
export function message_board_send(data) {
  return request({
    url: "/v1/h5/api/message_board/send",
    method: "POST",
    data,
  });
}

// Get signature
export function sign_trial(data) {
  return request({
    url: "/v1/h5/api/sign/sign_trial",
    method: "POST",
    data,
  });
}

// Query grouped message board list (services)
export function find_by_group(params) {
  return request({
    url: "/v1/h5/api/message_board/find_by_group",
    method: "GET",
    params,
  });
}

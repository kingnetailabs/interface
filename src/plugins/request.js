import axios from "axios";
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 600 * 1000,
});

service.interceptors.request.use(
  async (config) => {
    let { params, data, method, baseUrl, headers } = config;

    if (baseUrl) {
      config.baseURL = baseUrl;
    }

    config.headers["X-Token"] = "Bearer " + localStorage.getItem("token");

    if (headers) {
      config.headers = { ...config.headers, ...headers };
    }

    if (method === "GET") {
      params && (config.params = params);
    } else {
      data && (config.data = data);
    }
    return config;
  },
  (error) => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code == 501) {
      localStorage.removeItem("token");
      localStorage.removeItem("address");
      return;
    }

    if (typeof res.status == "undefined") return res;

    if (res.status !== 0) {
      return Promise.reject(res);
    } else {
      return res;
    }
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

export default service;

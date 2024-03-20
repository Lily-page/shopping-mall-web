import axios from "axios";
import Vue from 'vue'
import router from "./router";
import { getStore, removeStore } from "@/utils/storage";
import store from "./store";

const http = axios.create({
  // baseURL: "http://localhost:3000/mall/api",
  // baseURL: "https://mall-server.herokuapp.com/mall/api",
  baseURL: "https://shopping-mall-server-9kri.vercel.app/mall/api",
});

http.interceptors.request.use(
  (config) => {
    const token = getStore("token");
    if (token) {
      //表示用户已登录
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    // return response.data.code == 200 ? response : Promise.reject(response.data.msg);
    return response;
  },
  (error) => {
    if (error.response?.data.msg) {
      Vue.prototype.$message({
        type: 'error',
        message: error.response?.data.msg
      })

      if (error.response.status === 401) {
        removeStore("token");
        removeStore("userInfo");
        router.replace({
          path: "/login",
          // 将跳转的路由path作为参数，登录成功后跳转到该路由
          query: {
            redirect: router.currentRoute.fullPath,
          },
        });
      }
    }
  }
);

//路由守卫
router.beforeEach((to, from, next) => {
  http.post("/validate", {})
    .then((res) => {
      let data = res.data;
      if (data.state !== 1) {
        removeStore('userInfo')
        //用户要登录
        if (to.matched.some((record) => record.meta.auth)) {
          //用户未登录 需要跳转页面
          next({
            path: "/login",
            query: {
              redirect: to.fullPath,
            },
          });
        } else {
          next();
        }
      } else {
        //保存用户信息
        store.commit("ISLOGIN", data);
        if (to.path === "/login") {
          router.push({
            path: "/",
          });
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
  next();
});

export default http;

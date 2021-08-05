import axios from "axios";  
import {  getItem ,removeItem } from "@/utils/auth";
import router from "@/router";
// create an axios instance
const service = axios.create({
  // baseURL: "http://66.42.56.19:4000/api", // url = base url + request url
  baseURL: "http://127.0.0.1:8000/api" , //main
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    //if (store.getters.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    // config.data = 1
    config.headers['Authorization'] = getItem('token')
    //}
    return config;
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    // console.log(res);
    return res;
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code != 200) {
    //   console.log(res.message);
    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //   //   // to re-login
    //   //   console.log("You have been logged out, you can cancel to stay on this page, or log in again");
    //   // }
    //   // return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    if (error.response.status == 401) {
        removeItem('token');
        window.location.reload()
    }
    // console.log('err' + error.response.status) // for debug

    return Promise.reject(error);
  }
);

export default service;
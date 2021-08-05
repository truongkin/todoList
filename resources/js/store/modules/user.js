import { login, getInfo, logout ,reg} from "@/api/user";
import { getItem, setItem, removeItem } from "@/utils/auth";
// import router, { resetRouter } from '@/router'

const state = {
    token: getItem("token"),
    userinfo:""
};
const mutations = {
    SET_userinfo: (state, userinfo) => {
        state.userinfo = userinfo;
    },
};

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { email, password } = userInfo;
        return new Promise((resolve, reject) => {
            login({ email: email, password: password })
                .then(response => {
                    console.log(response);
                    setItem(
                        "token",
                        response.token_type + " " + response.access_token
                    );
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    reg({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            reg(userInfo)
                .then(response => {
                    console.log(response);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    

    // // get user info
    getInfo({ commit }) {
        return new Promise((resolve, reject) => {
            getInfo()
                .then(response => {
                    commit("SET_userinfo", response);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // // user logout
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            logout()
                .then(response => {
                    removeItem("token");
                    resolve(response);
                })
                .catch(error => {
                    // console.log(error);
                    reject(error);
                });
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
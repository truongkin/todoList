import VueRouter from "vue-router";
import Vue from 'vue'
import store from '@/store'
import { getItem }  from "@/utils/auth";
Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes: [
        {
            path: "/login",
            name: "login",
            component: () => import("./views/Login.vue"),
        },
        {
            path: "/register",
            name: "register",
            component: () => import("./views/Register.vue"),
        },
        {
            path: "/note",
            name: "note",
            component: () => import("./views/Index.vue"),
        },
        {
            path: "/not-authorized",
            name: "not-authorized",
            component: () => import("./views/NotAuthorized.vue"),
        },
    ]
});

router.beforeEach(async (to, _, next) => {
    
    const isLoggedIn = getItem('token')
    if(isLoggedIn){
        if (to.path === '/login') {
            return next({ path: '/note' })
        } else {
            await store.dispatch("user/getInfo");
            return next()
            
        }
    }else{
        if (to.path === '/login' || to.path === '/register') {
            next()
        } else {
            return next({ name: 'login' })
        }
    }

})

export default router;
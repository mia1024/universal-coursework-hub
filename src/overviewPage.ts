import {init} from "./entryCommon";
import * as VueRouter from "vue-router"
import {defineComponent} from "vue";

import {
    OverviewPage,
    CourseConfig,
    Popup,
    GlobalConfigs,
    Gradebook,
    Logs
} from "components"

let router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: OverviewPage,
            children: [
                {
                    path: "/",
                    redirect: "/dashboard"
                },
                {
                    path: "/dashboard",
                    name: "dashboard",
                    component: Popup
                },
                {
                    path: "/courseSettings",
                    name: "courseSettings",
                    component: CourseConfig
                },
                {
                    path: "/globalSettings",
                    name: "globalSettings",
                    component: GlobalConfigs
                },
                {
                    path: "/gradebook",
                    name: "gradebook",
                    component: Gradebook
                },
                {
                    path: "/logs",
                    name: "logs",
                    component: Logs
                }
            ]
        },
        {path: '/:noMatch(.*)*', name: 'NotFound', component: OverviewPage},
    ]
})
declare var IN_EXTENSION: boolean

console.log("ext", IN_EXTENSION)

let app = init(defineComponent({
    template: `<router-view/>`
}),)

app.use(router)
app.mount("#root")

import {createApp, Component} from "vue"
import {key, store} from "./store";
import ElementPlus from 'element-plus';
import './css/base.scss'
import 'element-plus/packages/theme-chalk/src/index.scss'

// Due to the nature of the project (two entries) this is necessary
export function init(rootComponent: Component, rootSelector: string) {
    let app = createApp(rootComponent)
    app.use(ElementPlus)
    app.use(store,key)
    app.mount(rootSelector)
    return app
}

import {createApp, Component} from "vue"
import {key, store} from "./store";
import ElementPlus from 'element-plus';
import 'normalize.css'
import './css/base.scss'
import 'element-plus/packages/theme-chalk/src/index.scss'
import 'element-plus/packages/theme-chalk/src/display.scss'

// Due to the nature of the project (two entries) this is necessary
export function init(rootComponent: Component) {
    let app = createApp(rootComponent)
    app.use(ElementPlus)
    app.use(store,key)
    return app
}

import {createApp, Component} from "vue"
import ElementPlus from 'element-plus';
import 'element-plus/packages/theme-chalk/src/index.scss'

// Due to the nature of the project (two entries) this is necessary
export function init(rootComponent: Component, rootSelector: string) {
    let app = createApp(rootComponent)
    app.use(ElementPlus)
    app.mount(rootSelector)
    return app
}

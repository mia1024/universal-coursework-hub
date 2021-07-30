import {createApp} from "vue"
import {Popup} from './components'

import {getCourses} from "./parser";
import {ElCard} from 'element-plus';
import 'element-plus/packages/theme-chalk/src/base.scss'
import 'element-plus/packages/theme-chalk/src/card.scss'


let app=createApp(Popup)
app.use(ElCard)
app.mount('#root')
export default app

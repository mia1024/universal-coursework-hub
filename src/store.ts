import type {Assignment, Course} from "./core"

import {InjectionKey} from 'vue'
import {createStore, Store, useStore as vUseStore} from 'vuex'
import {getCourses} from "./core";


export interface State {
    courses: Course[]
    assignments: Assignment[]
    loggedIn?: boolean
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        courses: [],
        assignments: [],
        loggedIn: undefined // undefined means unknown
    },
    mutations: {
        addCourse(state: State, course: Course) {
            state.courses.push(course)
        },
        updateCourse(state: State, data: { link: string, update: Partial<Course> }) {
            let c = state.courses.find(c => c.link === data.link)
            console.log(c)
            Object.assign(c, data.update) // TODO this is clearly not working
        },
        loggedIn(state: State, loginStatus: boolean) {
            state.loggedIn = loginStatus
        }
    }
})

getCourses().then(
    courses => {
        for (let c of courses)
            store.commit("addCourse", c)
        store.commit('loggedIn',true)
    }
).catch(
    e => {
        console.error(e)
        store.commit('loggedIn',false)
    }
)

export function useStore() {
    return vUseStore(key)
}

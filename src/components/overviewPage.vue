<template>
    <el-scrollbar height="100vh" ref="scrollbar">
        <el-container>
            <el-affix></el-affix>
            <el-main style="">

                <el-row style="padding-top: 2.5em" id="mainContent">
                    <el-col :sm="{span:4,offset:0}" :md="{span:4,offset:0}" :lg="{span:4,offset:2}"
                            :xl="{span:4,offset:4}"
                            class="hidden-xs-only">
                        <el-affix :offset="80">
                            <el-tabs tab-position="left" style="width: 100%;"
                                     @tab-click=" // well apparently scrollbar.setScrollTop is not a function...
                                    // maybe a vue3 bug?? had to dig into the implementation details for
                                    // element-plus for this....
                                    tabClicked($event.props.name)"
                                     v-model="selectedTab">
                                <el-tab-pane
                                        v-for="tab in tabs"
                                        :label="tab.label" :name="tab.name"
                                        :key="tab.name"
                                />
                            </el-tabs>
                        </el-affix>
                    </el-col>
                    <el-col
                            :xs="{span:24,offset:0}"
                            :sm="{span:16,offset:2}"
                            :md="{span:16,offset:2}"
                            :lg="{span:12,offset:0}"
                            :xl="{span:8,offset:0}"
                    >
                        <el-card v-if="$store.state.loggedIn===false">
                            <template #header>
                                <div style="text-align: center; color: #F56C6C; width: 100%;font-weight: 900">
                                    Cannot retrieve course information
                                </div>
                            </template>
                            <p>
                                Please make sure you are logged into <a href="https://www.gradescope.com">Gradescope</a>
                                first.
                            </p>

                            <p>
                                If you compiled this app from source code and are accessing this page outside the
                                context of an
                                extension
                                (if you have no clue what this means, you most definitely didn't and feel free to stop
                                reading from
                                here),
                                and you are sure you have logged in, then you are being blocked by the CORS policy. You
                                need to access
                                this
                                page inside an extension (that is, within a namespace of
                                <code>chrome-extension://</code>) with host
                                permission to gradescope.
                                The easiest way is to run <code>yarn build</code> and install the resulting zip file as
                                an unpacked
                                extension.
                                Alternatively, launch a chromium browser with <code>--disable-web-security</code> flag
                                and try this
                                again.
                            </p>
                        </el-card>
                        <div v-else-if="$store.state.loggedIn===undefined" style="width: 100%;text-align: center">
                            Loading...
                        </div>

                        <router-view v-else v-slot="{ Component, route }">
                            <transition name="fade" mode="out-in" @after-leave="$refs.scrollbar.wrap.scrollTop=0">
                                <component :is="Component" :key="route.path"/>
                            </transition>
                        </router-view>

                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </el-scrollbar>
</template>

<script lang="ts">
import {Vue, Options, Watch} from "vue-property-decorator"
import CourseCard from "./courseCard.vue"


@Options({components: {CourseCard}})
export default class OverviewPage extends Vue {

    tabs = [
        {name: "dashboard", label: "Dashboard"},
        {name: "globalSettings", label: "Global Settings"},
        {name: "courseSettings", label: "Course Settings"},
        {name: "logs", label: "Logs"},
        {name: "gradebook", label: "Gradebook"},
    ]

    selectedTab: string = "";

    created() {
        let name = this.$route.name
        if (name)
            this.selectedTab = name.toString()
    }

    @Watch("$route.name")
    updateViewName(name: string) {
        this.selectedTab = name;

    }

    tabClicked(tabName: string) {
        this.$router.push({name: tabName})
    }


}

</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
    transition: opacity .2s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>

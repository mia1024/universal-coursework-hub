<template>
  <el-row justify="center" style="margin-top: 2.5em">

    <el-col
        :xs="{span:24,offset:0}"
        :sm="{span:20,offset:2}"
        :md="{span:16,offset:4}"
        :lg="{span:12,offset:6}"
        :xl="{span:8,offset:8}"
    >

      <el-card v-if="$store.state.loggedIn===false">
        <template #header>
          <div style="text-align: center; color: #F56C6C; width: 100%;font-weight: 900">
            Cannot retrieve course information
          </div>
        </template>
        <p>
          Please make sure you are logged into <a href="https://www.gradescope.com">Gradescope</a> first.
        </p>

        <p>
          If you compiled this app from source code and are accessing this page outside the context of an extension
          (if you have no clue what this means, you most definitely didn't and feel free to stop reading from here),
          and you are sure you have logged in, then you are being blocked by the CORS policy. You need to access this
          page inside an extension (that is, within a namespace of <code>chrome-extension://</code>) with host permission to gradescope.
          The easiest way is to run <code>yarn build</code> and install the resulting zip file as an unpacked extension.
          Alternatively, launch a chromium browser with <code>--disable-web-security</code> flag and try this again.
        </p>
      </el-card>
      <div v-else-if="$store.state.loggedIn===undefined" style="width: 100%;text-align: center">
        Loading
      </div>

      <div id="cards-wrapper">
        <CourseCard
            :course="course"
            v-for="course in $store.state.courses"
            class="course-card"
        />
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {Vue, Options} from "vue-property-decorator"
import CourseCard from "./courseCard.vue"
import ElementPlus from "element-plus"


@Options({components: {CourseCard, ElementPlus}})
export default class ConfigPage extends Vue {

}

</script>

<style scoped lang="scss">

#cards-wrapper {
  width: 100%;
}

.course-card {
  width: 100%;
  margin-bottom: 1.5em;
}

body {
  background: gray;
}

</style>

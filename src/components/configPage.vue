<template>
  <el-row justify="center">
    <el-col :span="8" :offset="8">
      <CourseCard></CourseCard>
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

<style scoped>

</style>

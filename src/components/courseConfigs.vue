<template>
    <div>
        <CourseCard
                v-for="course in $store.state.courses"
                :course="course"
                :key="course.link"
                class="course-card"
        />
    </div>
</template>

<script lang="ts">
import {Vue, Options} from "vue-property-decorator"
import CourseCard from "./courseCard.vue"

@Options({components: {CourseCard}})
export default class CourseConfig extends Vue {

}
</script>

<style scoped lang="scss">

.course-card {
    width: 100%;
    margin-bottom: 1.5em;
}

</style>

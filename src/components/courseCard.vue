<template>
    <el-card shadow="always">
        <template #header>
            <div class="card-header">
        <span>
        <el-tooltip effect="dark" placement="top" :auto-close="1500" :disabled="editCourseName">
          <template #content>
            {{ course.description }}
          </template>
          <span :contenteditable="editCourseName"
                ref="courseNameSpan" id="course-name-span"
                @keypress="validateCourseInput($event)"
          >{{ course.name }}</span>
        </el-tooltip>

          <i v-if="!editCourseName"
             class="el-icon-edit-outline course-name-edit"
             style="margin-left: 2ch"
             @click="beginEditCourseName()">
          </i>
          <i v-else
             class="el-icon-check course-name-edit"
             style="margin-left: 2ch"
             @click="endEditCourseName()"></i>
          </span>
                <a :href="'https://www.gradescope.com/courses/'+course.id" target="_blank">View on Gradescope</a>
            </div>
        </template>

        <div class="card-row">
      <span>
          Course is active
      </span>
            <el-switch v-model="courseActive"/>
        </div>

        <template v-if="courseActive">
            <el-divider/>
            <div class="card-row">
        <span>
        Override Global Notification Settings
          </span>
                <el-switch v-model="globalOverride"/>
            </div>

            <div class="card-row">
        <span>
            Assignment Created
        </span>
                <el-switch v-model="notificationOnCreate" :disabled="!globalOverride"/>
            </div>

            <div class="card-row">
        <span>
            Assignment Changed
        </span>
                <el-switch v-model="notificationOnChange" :disabled="!globalOverride"/>
            </div>

            <div class="card-row">
        <span>
            Assignment Graded
        </span>
                <el-switch v-model="notificationOnGrade" :disabled="!globalOverride"/>
            </div>

        </template>

    </el-card>
</template>

<script lang="ts">
import {Vue, Prop, Watch} from "vue-property-decorator"
import {Course} from "core"
import {ElMessage} from "element-plus"

export default class CourseCard extends Vue {
    @Prop() course!: Course

    courseActive: boolean
    globalOverride: boolean

    notificationOnCreate: boolean
    notificationOnChange: boolean
    notificationOnGrade: boolean

    editCourseName: boolean = false


    data() {
        return {
            courseActive: this.course.isActive,
            globalOverride: false,
            notificationOnCreate: false,
            notificationOnChange: false,
            notificationOnGrade: false,
        }
    }

    @Watch('courseActive')
    switchClicked() {
        console.log(this.courseActive)
    }

    beginEditCourseName() {
        this.editCourseName = true;

        let span = this.$refs.courseNameSpan as HTMLSpanElement

        let sel = window.getSelection();
        let range = document.createRange();
        range.setStart(span.childNodes[0], span.innerText.length)
        range.setEnd(span.childNodes[0], span.innerText.length)
        sel!.removeAllRanges()
        sel!.addRange(range)
        span.focus()
        // this.$refs.courseNameSpan.focus();
    }

    endEditCourseName() {
        this.editCourseName = false
        let span = this.$refs.courseNameSpan as HTMLSpanElement
        let sel = window.getSelection();
        sel!.removeAllRanges()
        span.blur()

        let newCourseName = span.innerText.trim()

        if (!newCourseName) {
            span.innerText = this.course.name;
            return;
        }

        if (newCourseName === this.course.name)
            return // nothing changed


        this.$store.commit("updateCourse", {
            id: this.course.id,
            update: {
                name: newCourseName
            }
        })

        ElMessage({
            message: 'Course name updated',
            type: 'success'
        })
    }

    validateCourseInput(e: KeyboardEvent) {
        if (e.key === "Enter") {
            e.preventDefault()
            this.endEditCourseName()
        }
    }
}

</script>

<style scoped lang="scss">
@import "../css/colors";

.course-name-edit {
    color: black;

    &:hover {
        color: $color-highlight;
        cursor: pointer;
    }
}

.card-header, .card-row {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
}

.card-row {
    margin-bottom: 0.5em;
}

[contenteditable=true] {
    outline: $color-highlight 2px solid;
    outline-offset: 5px;

}


</style>

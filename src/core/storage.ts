import Dexie from 'dexie'
import type {
    Assignment,
    AssignmentDelta,
    Course,
    CourseConfigs,
    GlobalConfigs,
    GlobalState
} from "./types";

class GradeStorage extends Dexie {
    courseConfigs: Dexie.Table<CourseConfigs, string> // primary key course ID
    globalConfigs: Dexie.Table<GlobalConfigs, number>  // there is a single object in this table, primary key will be 0
    globalStates: Dexie.Table<GlobalState, number> // there is a single object in this table, primary key will be 0
    courses: Dexie.Table<Course, string> // primary key course ID
    assignments: Dexie.Table<Assignment, number> // auto-incremented primary key
    assignmentDeltas: Dexie.Table<AssignmentDelta, number> // auto-incremented primary key

    constructor() {
        super("GradeDatabase");
        this.version(1).stores({
            courseConfigs: "courseId",
            globalConfigs: "",
            globalStates: "",
            courses: "courseId,isActive",
            assignments: "++,[courseId+name]",
            assignmentDeltas: "++,[courseId+name],deleted"
        })

        this.courseConfigs = this.table("courseConfigs")
        this.globalConfigs = this.table("globalConfigs")
        this.globalStates = this.table("globalStates")
        this.courses = this.table("courses")
        this.assignments = this.table("assignments")
        this.assignmentDeltas = this.table("assignmentDeltas")
    }
}


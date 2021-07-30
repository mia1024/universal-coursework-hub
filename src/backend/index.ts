import {Assignment, Course} from "../core/types";

interface Backend {
    name: string
    getAssignments: () => Promise<Assignment[]>
    getCourses: () => Promise<Course[]>
    linkPrefix: string
    color: string
}

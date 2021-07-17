import $ from "jquery";
import {DOM, makeRequestToGradescope, toIDBBoolean} from "./utils";
import type {Course} from "./types";

function parseCourses(dom: DOM): Course[] {
    if (!dom.find('title').text().includes(" | ")) {
        console.warn(dom[0])
        throw new Error("Not logged in")
    }

    let courseList = dom.find("hr~div.courseList");
    if (courseList.length === 0) {
        courseList = dom.find("div.courseList");
    }
    let courses: Course[] = []
    let isFirstBox = true;
    for (let term of courseList.find("h2")) {
        let year = parseInt(term.innerText.match(/\d{4}/)![0], 10);
        let courseBoxes = $(term).next('div.courseList--coursesForTerm');
        for (let course of courseBoxes.find('a.courseBox')) {
            let box = $(course);
            let name = box.find('h3.courseBox--shortname').text();
            let description = box.find('h4.courseBox--name').text();
            let link = box.attr('href')!;
            courses.push({
                configs: undefined,
                name,
                year,
                description,
                id: link.substring(9), // the number at the end of /courses/0123456
                isActive: toIDBBoolean(isFirstBox),
                overrideGlobalConfigs: false,
                assignments: []
            })
        }
        isFirstBox = false;
    }
    return courses
}


export async function getCourses(): Promise<Course[]> {
    let serializedCourses = localStorage.getItem('courses')
    if (serializedCourses !== null) {
        return JSON.parse(serializedCourses)
    }
    let dom = await makeRequestToGradescope("/");
    let courses = parseCourses(dom);
    localStorage.setItem('courses', JSON.stringify(courses));
    return courses
}

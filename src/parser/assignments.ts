import {Course} from "./courses";
import $ from "jquery";
import {DOM, makeRequest} from "./utils";

const MONTHS = {
    'jan': 0,
    'feb': 1,
    'mar': 2,
    'apr': 3,
    'may': 4,
    'jun': 5,
    'jul': 6,
    'aug': 7,
    'sep': 8,
    'oct': 9,
    'nov': 10,
    'dec': 11
} as { [k: string]: number }

export type Assignment = {
    course: Course;
    name: string;
    deadline?: Date;
    lateDeadline?: Date;
    submitted: boolean;
    grade?: string;
    action?: string;
}

function parseDate(d: string, year: number): Date | undefined {
    let match = d.match(/(?<month>jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w* +(?<day>\d{1,2}) +at +(?<hour>\d{1,2}):(?<minute>\d{1,2})(?<ampm>am|pm)/i);
    if (match == null) return;
    let month = MONTHS[match.groups.month];
    let {day, hour, minute, ampm} = match.groups;
    let convertedHour = parseInt(hour, 10);
    if (convertedHour != 12 && ampm === 'pm') convertedHour += 12;
    return new Date(year, month, parseInt(day, 10), convertedHour, parseInt(minute, 0));
}

function parseRow(row: HTMLElement, year: number) {
    let name = $("th", row).text();
    let action = $("th>a", row).attr('href');
    let dueDate = $('.submissionTimeChart--dueDate', row)
    let deadline = dueDate.length >= 1 ? parseDate(dueDate.first().text().toLowerCase(), year) : undefined;
    let lateDueDate = dueDate.nextAll('.submissionTimeChart--dueDate');
    let lateDeadline = lateDueDate.length == 1 ? parseDate(lateDueDate.text().toLowerCase(), year) : undefined;
    let grade = $('td.submissionStatus>div.submissionStatus--score', row).text();
    let submitted: boolean;
    if (grade) {
        submitted = true;
    } else {
        grade = undefined;
        submitted = $('td.submissionStatus>div.submissionStatus--text', row).text() === 'Submitted';
    }
    return {
        name,
        deadline,
        lateDeadline,
        grade,
        submitted,
        action,
    }
}

export async function getAssignments(course: Course): Promise<Assignment[]> {
    let dom = await makeRequest(course.link);
    let result: Assignment[] = [];
    let rows = dom.find("tbody tr[role=row]");
    for (let row of rows) {
        let parsed = parseRow(row, course.year);
        result.push({...parsed, course})
    }
    return result
}

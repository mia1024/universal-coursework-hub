export interface PartialAssignment {
    name: string;
    deadline?: Date;
    lateDeadline?: Date;
    submitted: boolean;
    grade?: string;
    href?: string;
}

export interface Assignment extends PartialAssignment {
    course: Course;
}

export interface Course {
    name: string;
    link: string;
    desc: string;
    year: number;
    active: boolean;
    notifications: CourseNotificationConfig
}

export interface DefaultNotificationConfig{
    assignmentGraded: boolean,
    assignmentCreated: boolean,
    assignmentChanged: boolean
}

export interface CourseNotificationConfig extends DefaultNotificationConfig{
    overrideDefault: boolean,
}

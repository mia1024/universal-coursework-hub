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
    description: string;
    year: number;
    isActive: boolean;
    configs?: CourseConfigurations;
    overrideGlobalConfigs: boolean;
}

export interface CourseConfigurations {
    showLateAssignmentsBeforeLateDeadline: boolean
    showCompletedAssignmentsBeforeDeadline: boolean
    showCompletedAssignmentsBeforeLateDeadline: boolean

    showNotificationOnAssignmentCreated: boolean
    showNotificationOnAssignmentChanged: boolean
    showNotificationOnAssignmentGraded: boolean

    showAssignmentsDaysWithinDeadline: number
    // used to filter out assignments due too far into the future that nobody cares about

    backgroundColor:string
    foregroundColor:string

    assignmentGradeUsePercentage: boolean
}

export interface GlobalConfigurations {
    defaultCourseConfig: CourseConfigurations
    useBackgroundSync:boolean
    backgroundSyncInterval: number // in minutes
    maxNotificationsPerSync: number // we don't want to spam out notifications, after this just group things
    pauseNotifications:number // stressed out? gotchu
}


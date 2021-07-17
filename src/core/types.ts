/*
This file contains the definition for all the core types used by the program,
if you are reading this, you should get a quick sense of everything in the code
just from this file alone. All the logic of this program revolves around mutating
some of these types. This file has no actual code (meaning, nothing will be emitted)
 */


// indexedDB does not allow indexing on boolean for some reason and this is necessary.
// all the if conditions probably won't be affected. IDB stands for IndexedDB.

export type IDBTrue = 1
export type IDBFalse = 0
export type IDBBoolean = IDBTrue | IDBFalse

export interface Assignment {
    name: string;
    deadline?: Date;
    lateDeadline?: Date;
    submitted: IDBBoolean
    grade?: string;
    href?: string;
    courseId: string;
    // for anything the user punched in by hand and not found through sync
    // prevents triggering incorrect assignmentDeleted event
    manualEntry: IDBBoolean
}

export interface AssignmentDelta extends Partial<Assignment> {
    name: string // primary key
    courseId: string
    deleted: IDBBoolean
}

export interface Course {
    name: string;
    id: string;
    description: string;
    year: number;
    isActive: IDBBoolean;
    configs?: CourseConfigs;
    overrideGlobalConfigs: boolean;
    assignments: Assignment[]
}

export interface CourseConfigs {
    // booleans in this type can be boolean primitives because they don't need to be
    // indexed

    courseId: string // for global config this will have a special value __global__

    showLateAssignmentsBeforeLateDeadline: boolean
    showCompletedAssignmentsBeforeDeadline: boolean
    showCompletedAssignmentsBeforeLateDeadline: boolean

    showNotificationOnAssignmentCreated: boolean
    showNotificationOnAssignmentChanged: boolean
    showNotificationOnAssignmentGraded: boolean
    showNotificationOnAssignmentDeleted: boolean

    showAssignmentsDaysWithinDeadline: number
    // used to filter out assignments due too far into the future that nobody cares about

    backgroundColor: string
    foregroundColor: string

    assignmentGradeUsePercentage: boolean
}

export interface GlobalConfigs {
    defaultCourseConfig: CourseConfigs
    useBackgroundSync: boolean
    backgroundSyncInterval: number // in minutes
    maxNotificationsPerSync: number // we don't want to spam out notifications, after this just group things

    pauseNotifications: number // stressed out? gotchu
    notificationSound: boolean

}

export interface GlobalState {
    lastSync: number // ms since epoch, by Date().getTime()
    lastPageView: number // time same as above, last time the popup/overview page was visited
}

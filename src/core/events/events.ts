import type {Event, EventType, EventContainer} from "./types";

const EVENT_NAMESPACE_ROOT_EVENT_NAME = "__root__" // cannot be set through createEvent

/*
an example namespace for 'test.user.create'
{
    test: {
        EVENT_NAMESPACE_ROOT_EVENT_NAME: TestEvent
        user: {
            EVENT_NAMESPACE_ROOT_EVENT_NAME: TestUserEvent
            create: {
                EVENT_NAMESPACE_ROOT_EVENT_NAME: TestUserCreateEvent
            }
        }
    }
}
 */

const createdContainers = new Set<string>()

/** Create isolated containers. Events in different containers won't affect
 * each other even if they have the same names. Events created in one container
 * won't exist in other containers.
 *
 * @param{string|null} containerName - Name of the container. If null, the
 * container will be anonymous and cannot emit or listen to cross context
 * (window/tab/process) events. The names of two containers must be identical
 * for cross-context events to associate with each other.
 * @return {getEvent,createEvent} - a getEvent function and createEvent function
 * functionally equivalent to the normal versions but isolated.
 */
function createContainer(containerName: string | null): EventContainer {

    if (containerName !== null) {
        if (createdContainers.has(containerName)) {
            throw Error(`A container with name '${containerName}' already exists`)
        }
        if (containerName.indexOf(".") != -1) {
            throw Error(`Container name '${containerName}' cannot contain '.'`)
        }

        if (containerName.match(/^[a-zA-Z]/) === null) {
            throw Error(`Container name '${containerName}' must starts with a letter`)
        }

        createdContainers.add(containerName)
    }

    type BaseEventListener<Data> = (event: BaseEvent<Data>) => void
    type EventNamespace = Map<string, EventType<any> | EventNamespace>
    type Namespace = Map<string, Namespace>

    abstract class BaseEvent<D> { // D: DataType
        data: D
        static containerName: string | null = containerName

        // implemented in createEvent through Object.defineProperty
        static listeners: Set<BaseEventListener<any>>
        declare static type: string

        private static registeredTypes: EventNamespace = new Map();

        constructor(data: D) {
            this.data = data
        }

        get type() {
            return (this.constructor as any).type
        }

        get listeners(): Set<BaseEventListener<D>> {
            // the as any cast is the only way to get prototype
            return (this.constructor as any).listeners
        }

        static addListener<Data>(listener: BaseEventListener<Data>) {
            if (this.listeners.has(listener)) {
                throw Error("The listener to add is already registered for " + this.type)
            }
            this.listeners.add(listener)
            return this as unknown as EventType<Data>
        }

        static removeListener<Data>(listener: BaseEventListener<Data>) {
            if (!this.listeners.delete(listener)) {
                throw Error("The listener to remove was not found on " + this.type)
            }
            return this as unknown as EventType<Data>
        }

        static createEventNamespaces(stems: Array<string>, namespace: EventNamespace, created: string): EventNamespace {
            if (stems.length == 0) return namespace

            let name = stems.shift() as string
            let currentName = created ? created + "." + name : name

            let ns = namespace.get(name)
            if (ns === undefined) {
                // create empty namespace
                ns = new Map()
                namespace.set(name, ns)
                let e = createEventUnchecked(currentName)
                ns.set(EVENT_NAMESPACE_ROOT_EVENT_NAME, e)
            } else if (!(ns instanceof Map)) {
                // moves current event to a namespace
                let e = ns
                ns = new Map()
                ns.set(EVENT_NAMESPACE_ROOT_EVENT_NAME, e)
                namespace.set(name, ns)
            }

            return this.createEventNamespaces(stems, ns, currentName)
        }

        static registerType(typeName: string, type: EventType<any>) {
            let stems = typeName.split(".")
            let name = stems.pop()
            let ns = this.createEventNamespaces(stems, this.registeredTypes, "")
            ns.set(name!, type)
        }

        static getRegisteredType(typeName: string): EventType<any> | undefined {
            let stems = typeName.split(".")

            let ns = this.registeredTypes

            do {
                let name = stems.shift() as string
                let nsOrEvent = ns.get(name)
                if (nsOrEvent === undefined) return undefined
                if (nsOrEvent instanceof Map) {
                    ns = nsOrEvent
                    if (stems.length === 0)
                        return ns.get(EVENT_NAMESPACE_ROOT_EVENT_NAME) as EventType<any>
                } else if (stems.length == 0) {
                    return nsOrEvent
                } else {
                    return undefined
                }
            } while (stems.length > 0)
        }


        emit() {
            let errors: any[] = []
            let type: EventType<any> = this.constructor as EventType<any>
            let parents = type.type.substring(0, type.type.lastIndexOf("."))
            while (true) {
                type.listeners.forEach(l => {
                        try {
                            l(this)
                        } catch (e) {
                            console.error(`Error in event listener for ${this.type} ${
                                containerName === null ? "(anonymous container)" : "(container " + containerName + ")"
                            }`, e)
                            errors.push(e)
                        }
                    }
                )
                if (errors.length > 0) {
                    throw errors.shift()
                }
                let tmp = getEvent(parents)
                if (tmp === undefined) return
                type = tmp
                parents = type.type.substring(0, type.type.lastIndexOf("."))
            }
        }
    }

    function createEventUnchecked<Data>(type: string): EventType<Data> {
        class E extends BaseEvent<Data> {
            declare static type: string // assigned using Object.defineProperty below()
            declare static container: EventContainer
        }

        Object.defineProperty(E, "type", {value: type, writable: false})
        Object.defineProperty(E, "name", {
            value: type.replace(/(?:^|\.)(\w)/gi, (p1, p2) => p2.toUpperCase()) + "Event",
            writable: false
        })
        Object.defineProperty(E, "listeners", {value: new Set(), writable: false})
        Object.defineProperty(E, "container", {value: container, writable: false})
        return E
    }


    function createEvent<Data>(type: string, errorIfExists: boolean = false): EventType<Data> {
        if (type.match(/^([A-Za-z][^.]*?(\.(?!$))?)+$/) === null) {
            throw Error(`Event type name '${type}' must starts with a letter (every level)`)
        }
        let e = getEvent(type)
        if (e !== undefined) {
            if (errorIfExists) {
                throw Error(`An event type with name '${type}' ${
                    containerName === null ? "(anonymous container)" : "(container " + containerName + ")"
                } already exists`)
            } else return e
        }

        let E = createEventUnchecked<Data>(type)

        BaseEvent.registerType(type, E)
        return E
    }


    function getEvent<Data = any>(type: string): EventType<Data> | undefined {
        if (!type.match(/^[a-zA-Z]/)) {
            return undefined
        }
        return BaseEvent.getRegisteredType(type) as EventType<Data>
    }


    const container = {createEvent, getEvent}
    return container
}

const {createEvent, getEvent} = createContainer("global")

function createSimpleEvent(type: string, errorIfExists: boolean = true): EventType<void> {
    return createEvent<void>(type, errorIfExists)
}

export {createContainer, createEvent, createSimpleEvent, getEvent}

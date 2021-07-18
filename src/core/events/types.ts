type EventListener<Data> = (event: Event<Data>) => void

interface Event<Data>{
    data: Data
    listeners: Set<EventListener<Data>>
    type: string
    emit:()=>void
}

interface EventType<Data>{
    new(data:Data):Event<Data>
    listeners: Set<EventListener<Data>>
    addListener(listener:EventListener<Data>):void
    type: string
}

export type {EventListener, Event, EventType}


class BaseEvent {
    name: string
    data: any

    constructor(name: string, data: any) {
        this.name = name
        this.data = data
    }

    emit() {

    }
}

/**
 * Represents a queue for a service
 */
class Queue {
    id: number;
    serviceId: number;
    date: Date;
    length: number;

    constructor(id: number, serviceId: number, date: Date, length: number) {
        this.id = id;
        this.serviceId = serviceId;
        this.date = date;
        this.length = length;
    }
}

export { Queue }
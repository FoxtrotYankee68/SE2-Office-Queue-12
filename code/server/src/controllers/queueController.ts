import QueueDAO from "../dao/queueDAO";
import {Queue} from "../components/queue";

class QueueController {
    private dao: QueueDAO

    constructor() {
        this.dao = new QueueDAO();
    }

    async getQueue(serviceId: number, date: Date): Promise<Queue> {
        return this.dao.getQueue(serviceId, date);
    }

    async getQueuesByService(serviceId: number): Promise<Queue[]> {
        return this.dao.getAllQueuesByService(serviceId);
    }

    async getQueuesByDate(date: Date): Promise<Queue[]> {
        return this.dao.getAllQueuesByDate(date);
    }

    async getAllQueues(): Promise<Queue[]> {
        return this.dao.getAllQueues();
    }

    async addQueue(serviceId: number, date: Date): Promise<void> {
        return this.dao.addQueue(serviceId, date);
    }

    async editQueue(serviceId: number, date: Date, length: number): Promise<void> {
        return this.dao.editQueue(serviceId, date, length);
    }

    async deleteQueue(serviceId: number, date: Date): Promise<void> {
        return this.dao.deleteQueue(serviceId, date);
    }

    async deleteAllQueues(): Promise<void> {
        return this.dao.deleteAllQueues();
    }
}

export default QueueController;
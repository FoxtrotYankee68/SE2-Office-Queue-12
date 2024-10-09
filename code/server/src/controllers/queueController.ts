import QueueDAO from "../dao/queueDAO";
import {Queue} from "../components/queue";

class QueueController {
    private dao: QueueDAO

    constructor() {
        this.dao = new QueueDAO();
    }

    async getQueue(serviceId: string, date: Date): Promise<Queue> {
        return this.dao.getQueue(serviceId, date);
    }

    async addQueue(serviceId: string, date: Date): Promise<void> {
        return this.dao.addQueue(serviceId, date);
    }

    async deleteQueue(serviceId: string, date: Date): Promise<void> {
        return this.dao.deleteQueue(serviceId, date);
    }

    async addCustomerToQueue(serviceId: string, date: Date): Promise<Queue> {
        return this.dao.addCustomerToQueue(serviceId, date);
    }
}

export default QueueController;
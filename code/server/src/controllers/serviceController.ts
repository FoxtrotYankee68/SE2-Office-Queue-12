import ServiceDAO from "../dao/serviceDAO";
import {Service} from "../components/service";

class ServiceController {
    private dao: ServiceDAO

    constructor() {
        this.dao = new ServiceDAO;
    }

    /**
     * Inserts a new service in the database.
     * @param name - The name of the service.
     * @param serviceTime - The time the service takes to complete.
     * @returns A promise that resolves if the operation is successful.
     */
    async addService(name: string, serviceTime: number): Promise<void> {
        return this.dao.addService(name, serviceTime);
    }

    /**
     * Retrieves a specific service from the database.
     * @param id - The id of the service to retrieve.
     * @returns A promise that resolves with the service if it exists.
     */
    async getService(id: string): Promise<Service> {
        return this.dao.getService(id);
    }

    /**
     * Deletes a specific service from the database.
     * @param id - The id of the service to delete.
     * @returns A promise that resolves if the operation is successful.
     */
    async deleteService(id: string): Promise<void> {
        return this.dao.deleteService(id);
    }

    /**
     * Edits a specific service in the database.
     * @param id - The id of the service to edit.
     * @param name - The new name of the service.
     * @param serviceTime - The new service time of the service.
     * @returns A promise that resolves if the operation is successful.
     */
    async editService(id: string, name: string, serviceTime: number): Promise<void> {
        return this.dao.editService(id, name, serviceTime);
    }
}

export default ServiceController;
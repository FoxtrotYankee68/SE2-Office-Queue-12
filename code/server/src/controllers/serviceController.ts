import ServiceDAO from "../dao/serviceDAO";
import {Service} from "../components/service";

class ServiceController {
    private dao: ServiceDAO

    constructor() {
        this.dao = new ServiceDAO;
    }

    async addService(name: string): Promise<void> {
        return this.dao.addService(name);
    }

    async getService(id: string): Promise<Service> {
        return this.dao.getService(id);
    }

    async delateService(id: string): Promise<void> {
        return this.dao.deleteService(id);
    }

    async editService(id: string, name: string): Promise<void> {
        return this.dao.editService(id, name);
    }

}

export default ServiceDAO
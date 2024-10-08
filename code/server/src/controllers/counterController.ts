import ItemDAO from "../dao/counterDAO";
import {Counter} from "../components/counter";

/**
 * Represents a controller for managing shopping carts.
 * All methods of this class must interact with the corresponding DAO class to retrieve or store data.
 */
class CounterController {
    private dao: ItemDAO

    constructor() {
        this.dao = new ItemDAO;
    }

    async getCounter(id: string): Promise<Counter> {
        return this.dao.getCounter(id);
    }

    async getAllCounters(): Promise<Counter[]> {
        return this.dao.getAllCounters();
    }

    async addCounter(name: string): Promise<void> {
        return this.dao.addCounter(name);
    }

    async deleteCounter(id: number): Promise<void> {
        return this.dao.deleteCounter(id);
    }

    async editCounter(id: number, name: string): Promise<void> {
        return this.dao.editCounter(id, name);
    }
}

export default CounterController
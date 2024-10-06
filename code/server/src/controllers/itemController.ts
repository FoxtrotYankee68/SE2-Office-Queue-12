import ItemDAO from "../dao/itemDAO";
import {Item} from "../components/item";

/**
 * Represents a controller for managing shopping carts.
 * All methods of this class must interact with the corresponding DAO class to retrieve or store data.
 */
class ItemController {
    private dao: ItemDAO

    constructor() {
        this.dao = new ItemDAO;
    }

    async getItem(id: string): Promise<Item> {
        return this.dao.getItem(id);
    }

    async addItem(id: string): Promise<void> {
        return this.dao.addItem(id);
    }
}

export default ItemController
import db from "../db/db";
import {Item} from "../components/item";

class ItemDAO {
    getItem(id: string): Item {
        return new Item(id);
    }

    addItem(id: string) {
        return;
    }
}

export default ItemDAO;
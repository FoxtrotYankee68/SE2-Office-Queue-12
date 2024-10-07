/**
 * Represents a review given by a customer to a purchased product
 */
class Item {
    id: string;
    description: String;

    constructor(id: string, description: String = "") {
        this.id = id;
        this.description = description;
    }
}

export { Item }
class Ticket {
    id: number;
    position_queue: number;
    date_issued: string;
    is_served: number;

    constructor(id: number, pos_queue: number, date_issued: string, is_served: number){
        this.id = id;
        this.position_queue = pos_queue;
        this.date_issued = date_issued;
        this.is_served = is_served;
    }
}

export {Ticket};
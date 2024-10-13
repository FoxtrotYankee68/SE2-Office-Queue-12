import TicketDAO from "../dao/ticketDAO";
import {Ticket} from "../components/ticket";

class TicketController {
    private dao: TicketDAO

    constructor() {
        this.dao = new TicketDAO();
    }

    async getTicket(id: number): Promise<Ticket> {
        return this.dao.getTicket(id);
    }

    async getTickets(): Promise<Ticket[]> {
        return this.dao.getTickets();
    }

    async addTicket(serviceId: number, date: Date = null): Promise<void> {
        return this.dao.addTicket(serviceId, date);
    }

    async editTicket(id: number, serviceId: number, counterId: number, position: number, date: Date, served: boolean): Promise<void> {
        return this.dao.editTicket(id, serviceId, counterId, position, date, served);
    }

    async deleteTicket(id: number): Promise<void> {
        return this.dao.deleteTicket(id);
    }

    async deleteTickets(): Promise<void> {
        return this.dao.deleteTickets();
    }

    async getNewTicket(serviceId: number): Promise<Ticket> {
        return this.dao.getNewTicket(serviceId);
    }

    async updateTicketCounter(id: number, counterId: number): Promise<void> {
        const ticket = await this.getTicket(id);

        return this.dao.editTicket(
            ticket.id,
            ticket.serviceId,
            counterId,
            ticket.queuePosition,
            ticket.issueDate,
            ticket.served
        )
    }

    async markTicketServed(id: number): Promise<void> {
        const ticket = await this.getTicket(id);

        return this.dao.editTicket(
            ticket.id,
            ticket.serviceId,
            ticket.counterId,
            ticket.queuePosition,
            ticket.issueDate,
            true
        )
    }
}

export default TicketController;
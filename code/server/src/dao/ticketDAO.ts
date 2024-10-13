import db from "../db/db";
import { Ticket } from "../components/ticket";
import { resolve } from "path";
import { rejects } from "assert";


const getFormattedDate = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // I mesi partono da 0, quindi aggiungi 1
    const year = today.getFullYear();
  
    return `${day}/${month}/${year}`;
};


class TicketDAO{
    /**
     * Retrieves all tickets associated with a specific service that have not yet been served.
     *
     * @param serviceId - The ID of the service for which to retrieve tickets.
     * @returns A Promise that resolves to an array of Ticket objects associated with the specified service.
     * @throws An error if the database query fails.
    */
    getTicketsByService(serviceId: number): Promise<Ticket[]> {
        return new Promise<Ticket[]>((resolve, reject) => {
            const sql = "SELECT * FROM ticket WHERE serviceId = ? AND is_served = 0";
            db.all(sql, [serviceId], (err, rows) => {
                if(err){
                    return reject(err);
                }
                const tickets = rows.map((t: any) => new Ticket(t.id, t.position_queue, t.date_issued, t.is_served));
                resolve(tickets);
            });
        });
    }

    /**
     * Marks a ticket as issued by updating its status and associating it with a specific counter.
     *
     * @param ticketId - The ID of the ticket to be marked as issued.
     * @param counterId - The ID of the counter that is serving the ticket.
     * @returns A Promise that resolves to void if the operation is successful.
     * @throws An error if the update operation fails or if no rows were affected.
    */
    issuedTicket(ticketId: number, counterId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const date = getFormattedDate();
            const sql = `UPDATE ticket 
                            SET counterId = ?, date_issued = ?, is_served = 1
                            WHERE id = ?`;
            db.run(sql, [counterId, date, ticketId], function(this: any, err: Error | null){
                if(err){
                    return reject(err);
                }
                if(this.changes === 0){
                    return reject(new Error("Update not correct."));
                }
                return resolve();
            });
        });
    }

}   

export default TicketDAO;
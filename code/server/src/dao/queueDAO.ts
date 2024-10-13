import db from "../db/db";
import {Queue} from "../components/queue";
import { resolve } from "path";
import { rejects } from "assert";

const getFormattedDate = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // I mesi partono da 0, quindi aggiungi 1
    const year = today.getFullYear();
  
    return `${day}/${month}/${year}`;
};

const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0'); // Giorno (dd)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mese (mm) - Ricorda che getMonth() restituisce 0-11
    const year = date.getFullYear(); // Anno (yyyy)
    
    return `${day}/${month}/${year}`;
};

class QueueDAO {
    getQueue(serviceId: string, date: Date): Promise<Queue> {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM queue WHERE serviceId = ? AND date = ?`;
            db.get(sql, [serviceId, formatDate(date)], (err, row: Queue) => {
                if (err) {
                    return reject(err);
                }
                if (row == undefined) {
                    return reject("No queue found with specified id");
                }
                return resolve(row);
            })
        })
    }

    addQueue(serviceId: string, date: Date): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql: string = "INSERT INTO queue VALUES(?, ?, 0)"
            db.run(sql, [serviceId, formatDate(date)], function(err: Error | null){
                if(err){
                    return reject(err);
                }
                return resolve();
            })
        })
    }

    addCustomerToQueue(serviceId: string, date: Date): Promise<Queue> {
        return new Promise((resolve, reject) => {
            const sql: string = "UPDATE queue SET length = length + 1 WHERE serviceId = ? AND date = ?";
            db.run(sql, [serviceId, formatDate(date)], (err: Error | null) => {
                if (err) {
                    return reject(err);
                }
            })
            const get_queue: string = "SELECT * FROM queue WHERE serviceId = ? AND date = ?";
            db.get(get_queue, [serviceId, formatDate(date)], (err: Error | null, row: Queue) => {
                if(err){
                    return reject(err);
                }
                if (row == undefined) {
                    return reject("No queue found with specified serviceId for specified date");
                }

                return resolve(row);
            })
        })
    }

    deleteQueue(serviceId: string, date: Date): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql: string = "DELETE FROM queue WHERE serviceId = ? AND date = ?";
            db.run(sql, [serviceId, formatDate(date)], (err: Error | null) => {
                if (err) {
                    return reject(err);
                }

                return resolve();
            })
        })
    }

    /**
    * @param counterId The ID of the counter to return the various queues it can serve
    * @returns A Promise of an array of Queue objects
    */
    getQueuesForCounter(counterId: number): Promise<Queue[]> {
        return new Promise<Queue[]>((resolve, reject) => {
            const date = getFormattedDate();
            const sql: string = `SELECT queue.serviceId, queue.date, queue.length
                                FROM counter_service, queue
                                WHERE counter_service.counterId = ? AND counter_service.date = ?
                                    AND queue.serviceId = counter_service.serviceId`;
            db.all(sql, [counterId, date], (err, rows) => {
                if(err){
                    return reject(err);
                }
                const queues = rows.map((q: any) => new Queue(q.serviceId, q.date, q.length));
                return resolve(queues);
            });
        });
    }

    /**
    * Removes a ticket from the queue based on the provided service ID.
    *
    * @param serviceId - The ID of the service for which the ticket should be removed from the queue.
    * @returns A Promise that resolves to void if the operation is successful.
    * @throws An error if the update operation fails or if no rows were affected.
    */
    removeTicketFromQueue(serviceId: number): Promise<void> {
        const date = getFormattedDate();
        return new Promise<void>((resolve, reject) => {
            const sql = `UPDATE queue SET length = length - 1 WHERE serviceId = ? AND date = ?`;
            db.run(sql, [serviceId, date], function(this: any, err: Error | null){
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

    /**
     * Resets the length of the queue to zero and updates the date.
     *
     * @returns A Promise that resolves to void if the operation is successful.
     * @throws An error if the reset operation fails or if no rows were affected.
     */
    resetQueue(): Promise<void>{
        const date = getFormattedDate();
        return new Promise<void>((resolve, reject) => {
            const sql = `UPDATE queue SET length = 0, date = ?`;
            db.run(sql, [date], function(this: any, err: Error | null){
                if(err){
                    return reject(err);
                }
                if(this.changes === 0){
                    return reject(new Error("Reset not correct."));
                }
                return resolve();
            });
        });
    }
}

export default QueueDAO;


























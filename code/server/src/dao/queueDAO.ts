import db from "../db/db";
import {Queue} from "../components/queue";

class QueueDAO {
    getQueue(serviceId: string, date: Date): Promise<Queue> {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM queue WHERE serviceId = ? AND date = ?`;
            db.get(sql, [serviceId, date.toDateString()], (err, row: Queue) => {
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
            db.run(sql, [serviceId, date.toDateString()], function(err: Error | null){
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
            db.run(sql, [serviceId, date.toDateString()], (err: Error | null) => {
                if (err) {
                    return reject(err);
                }
            })
            const get_queue: string = "SELECT * FROM queue WHERE serviceId = ? AND date = ?";
            db.get(get_queue, [serviceId, date.toDateString()], (err: Error | null, row: Queue) => {
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
            db.run(sql, [serviceId, date.toDateString()], (err: Error | null) => {
                if (err) {
                    return reject(err);
                }

                return resolve();
            })
        })
    }
}

export default QueueDAO;


























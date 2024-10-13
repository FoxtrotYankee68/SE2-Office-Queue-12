import db from "../db/db";
import {Queue} from "../components/queue";
import Utilities from "../utilities";

class QueueDAO {
    getQueue(serviceId: number, date: Date): Promise<Queue> {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM queue WHERE serviceId = ? AND date = ?";
            db.get(sql, [serviceId, Utilities.getFormattedDate(date)], (err, row: Queue) => {
                if (err) return reject(err);
                if (row == undefined) return reject("1. No queue found for specified service and date");

                return resolve(row);
            })
        })
    }

    getAllQueuesByService(serviceId: number): Promise<Queue[]> {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM queue WHERE serviceId = ?";
            db.all(sql, [serviceId], (err, rows: Queue[]) => {
                if (err) return reject(err);
                if (rows == undefined) return reject("No queues found with specified service id");

                return resolve(rows);
            })
        })
    }

    getAllQueuesByDate(date: Date): Promise<Queue[]> {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM queue WHERE date = ?"
            db.all(sql, [Utilities.getFormattedDate(date)], (err, rows: Queue[]) => {
                if (err) return reject(err);
                if (rows == undefined) return reject("No queues found for specified date");

                return resolve(rows)
            })
        })
    }

    getAllQueues(): Promise<Queue[]> {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM queue"
            db.all(sql, (err, rows: Queue[]) => {
                if (err) return reject(err);
                if (rows === undefined) return reject("No queues found");

                return resolve(rows);
            })
        })
    }

    addQueue(serviceId: number, date: Date): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO queue VALUES(?, ?, 0)"
            db.run(sql, [serviceId, Utilities.getFormattedDate(date)], function(err){
                if(err) return reject(err);

                return resolve();
            })
        })
    }

    editQueue(serviceId: number, date: Date, length: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE queue (length) VALUES(?) WHERE serviceId = ? AND date = ?";
            db.run(sql, [length, serviceId, Utilities.getFormattedDate(date)], function(err){
                if (err) return reject(err);

                return resolve();
            })
        })
    }

    deleteQueue(serviceId: number, date: Date): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM queue WHERE serviceId = ? AND date = ?";
            db.run(sql, [serviceId, Utilities.getFormattedDate(date)], (err) => {
                if (err) return reject(err);

                return resolve();
            })
        })
    }

    deleteAllQueues(): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM queue";
            db.run(sql, (err) => {
                if (err) return reject(err);

                return resolve();
            })
        })
    }
}

export default QueueDAO;


























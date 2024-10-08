import db from "../db/db";
import {Counter} from "../components/counter";
import { rejects } from "assert";
import { resolve } from "path";

class CounterDAO {
    getCounter(id: string): Promise<Counter> {
        return new Promise<Counter>((resolve, reject) => {
            const sql = "SELECT * FROM counter WHERE id = ?";
            db.get<any>(sql, [id], (err, row) => {
                if(err){
                    return reject(err);
                }
                if(row === undefined){
                    return reject("Counter not found.");
                }else{
                    return resolve(new Counter(row.id, row.name));
                }
            });
        });
    }

    getAllCounters(): Promise<Counter[]> {
        return new Promise<Counter[]>((resolve, reject) => {
            const sql = "SELECT * FROM counter";
            db.all(sql, [], (err, rows) => {
                if(err){
                    return reject(err);
                }
                const counters = rows.map((r: any) => new Counter(r.id, r.name));
                return resolve(counters);
            });
        });
    }

    deleteCounter(id: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const sql = "DELETE FROM counter WHERE id = ?";
            db.run(sql, [id], function(this: any, err: Error | null){
                if(err){
                    return reject(err);
                }
                if(this.changes !== 0){
                    return resolve();
                }
                return reject("Counter not found.");
            });
        });
    }

    addCounter(name: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const sql = "INSERT INTO counter(name) VALUES(?)";
            db.run(sql, [name], function(this: any, err: Error | null){
                if(err){
                    return reject(err);
                }
                if(this.lastID == 0){
                    reject("Insertion not completed correctly.");
                }else{
                    resolve();
                }
            });
        });
    }

    editCounter(id: number, name: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const sql = "UPDATE counter SET name = ? WHERE id = ?";

            db.run(sql, [name, id], function(this: any, err: Error | null){
                if(err){
                    return reject(err);
                }
                
                if(this.changes !== 0){
                    return resolve();
                }else{
                    return reject("Update not completed correctly.");
                }
            });
        });
    }

}

export default CounterDAO;
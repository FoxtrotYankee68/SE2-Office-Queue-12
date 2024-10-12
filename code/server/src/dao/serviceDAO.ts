import db from "../db/db";
import {Service} from "../components/service";

class ServiceDAO {
    /**
     * Inserts a new service in the database.
     * @param name - The name of the service.
     * @param serviceTime - The time the service takes to complete.
     * @returns A promise that resolves if the operation is successful.
    */
    async addService(name: string, serviceTime: number): Promise<void> {
        const sql = "INSERT INTO service (name, serviceTime) VALUES (?,?)";
        const params = [name, serviceTime];

        try {
            await new Promise<void>((resolve, reject) => {
                db.run(sql, params, (err) => {
                    if (err) {
                        reject(new Error(`Error inserting service: ${err.message}`));
                    } else {
                        resolve();
                    }
                });
            });
        } catch (err) {
            throw new Error(`Error inserting service: ${err}`);
        }
    }
    
    /**
     * Get a specific service in the database.
     * @param id - The id of the service.
     * @returns A promise that resolves with the service if it exists.
    */    
    getService(id: string): Promise<Service> {
        const sql = "SELECT * FROM service WHERE id = ?";
        const params = [id];

        return new Promise((resolve, reject) => {
            db.get(sql, params, (err: Error | null, row: any) => {
                if (err) {
                    reject(new Error(`Error retrieving service: ${err.message}`));
                    return;
                }
                
                if (!row) {
                    reject(new Error(`Service with ID ${id} not found`));
                    return;
                }
                
                const service: Service = {
                    id: row.id,
                    name: row.name,
                    serviceTime: row.serviceTime
                };
                
                resolve(service);
            });
        });
    }

    /**
     * Retrieves all services from the database.
     * @returns A promise that resolves with an array of services.
    */
    getServices(): Promise<Service[]> {
        const sql = "SELECT * FROM service";
        return new Promise((resolve, reject) => {
            db.all(sql, [], (err: Error | null, rows: any[]) => {
                if (err) {
                    reject(new Error(`Error retrieving services: ${err.message}`));
                    return;
                }
                
                const services: Service[] = rows.map((row: any) => {
                    return {
                        id: row.id,
                        name: row.name,
                        serviceTime: row.serviceTime
                    };
                });

                resolve(services);
            });
        });
    }

    /**
     * Deletes a specific service from the database.
     * @param name - The name of the service to delete.
     * @returns A promise that resolves if the operation is successful.
    */
    deleteService(name: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM service WHERE name = ?";
            const params = [name];

            db.run(sql, params, (err: Error | null) => {
                if (err) {
                    reject(new Error(`Error deleting service: ${err.message}`));
                    return;
                }

                resolve();
            });
        });
    }
    
    /**
     * Edits a specific service in the database.
     * @param name - The id of the service to edit.
     * @param newName - The new name of the service.
     * @param serviceTime - The new service time of the service.
     * @returns A promise that resolves if the operation is successful.
    */
    editService(name: string, newName: string, serviceTime: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE service SET name = ?, serviceTime = ? WHERE name = ?";
            const params = [newName, serviceTime, name];

            db.run(sql, params, (err: Error | null) => {
                if (err) {
                    reject(new Error(`Error editing service: ${err.message}`));
                    return;
                }

                resolve();
            });
        });
    }

    /**
     * Estimate waiting time for a specific service in the database.
     * @param id - The id of the service.
     * @returns ??
    */    
        estimateServiceWaitingTime(id: string): Promise<number> {
            const sql = "SELECT serviceTime FROM service WHERE id = ?";
            const params = [id];
    
            return new Promise((resolve, reject) => {
                db.get(sql, params, (err: Error | null, row: any) => {
                    if (err) {
                        reject(new Error(`Error retrieving service: ${err.message}`));
                        return;
                    }
        
                    if (!row) {
                        reject(new Error(`Service with this ID not found`));
                        return;
                    }
        
                    // Extract serviceTime from the row
                    const serviceTime = row.serviceTime;
        
                    const queueSql = "SELECT length, date FROM queue WHERE serviceId = ?"; // 
                    db.get(queueSql, params, (err: Error | null, queueRow: any) => {
                        if (err) {
                            reject(new Error(`Error retrieving additional data: ${err.message}`));
                            return;
                        }
                        if (!queueRow) {
                            reject(new Error(`No additional data found for serviceTime ${serviceTime}`));
                            return;
                        }

                        const dateQueue = queueRow.date;
                        const length = queueRow.length;

                         // Now run the final query using the dateQueue and the serviceId
                        const counterSql = `
                            SELECT count(serviceId)
                            FROM counter_service
                            WHERE date = ? AND counterId IN (
                                SELECT counterId 
                                FROM counter_service
                                WHERE serviceId = ? AND date = ?
                            )
                            GROUP BY counterId;
                            `;

                // Use dateQueue and id (serviceId) as parameters for the final query
                const counterParams = [dateQueue, id, dateQueue];
                
                db.all(counterSql, counterParams, (err: Error | null, counterRows: any[]) => {
                    if (err) {
                        reject(new Error(`Error retrieving counter data: ${err.message}`));
                        return;
                    }                    
                    if (!counterRows || counterRows.length === 0) {
                        reject(new Error(`No counters found for serviceId ${id} on date ${dateQueue}`));
                        return;
                    }
                    const counts = counterRows.map(row => row['count(serviceId)']);


                    //formula
                    // Step 1: Calculate sum of the reciprocals of each ki
                    const sumReciprocals = counts.reduce((acc, val) => acc + (1 / val), 0);
                    // Step 2: Calculate the final value of Tr
                    const Tr = serviceTime * (0.5 + length / sumReciprocals);

                    resolve(Tr);  // This is waiting time
            });
            

                    });

                });
            });
        }
}

export default ServiceDAO;

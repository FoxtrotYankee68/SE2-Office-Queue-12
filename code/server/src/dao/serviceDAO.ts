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
     * Deletes a specific service from the database.
     * @param id - The ID of the service to delete.
     * @returns A promise that resolves if the operation is successful.
     */
    deleteService(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM service WHERE id = ?";
            const params = [id];

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
     * @param id - The id of the service to edit.
     * @param name - The new name of the service.
     * @param serviceTime - The new service time of the service.
     * @returns A promise that resolves if the operation is successful.
     */
    editService(id: string, name: string, serviceTime: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE service SET name = ?, serviceTime = ? WHERE id = ?";
            const params = [name, serviceTime, id];

            db.run(sql, params, (err: Error | null) => {
                if (err) {
                    reject(new Error(`Error editing service: ${err.message}`));
                    return;
                }

                resolve();
            });
        });
    }
}

export default ServiceDAO;
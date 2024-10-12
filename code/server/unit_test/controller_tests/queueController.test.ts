import { describe, test, expect, jest, afterEach, afterAll } from "@jest/globals"
import db from "../../src/db/db"
import { Database, RunResult } from "sqlite3"
import QueueDAO from "../../src/dao/queueDAO"
import QueueController from "../../src/controllers/queueController"
import { Queue } from "../../src/components/queue"
import exp from "constants"

jest.mock("../../src/db/db.ts")

function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');  // Ottiene il giorno e aggiunge lo zero iniziale se necessario
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Ottiene il mese (nota: i mesi partono da 0)
    const year = date.getFullYear();  // Ottiene l'anno

    return `${day}/${month}/${year}`;
}

afterEach(() => {
    jest.clearAllMocks(); // Ripristina tutti i mock dopo ogni test
});

afterAll(() => {
    jest.clearAllMocks();

})

describe(("Queue controller"), () => {

    //-------- getQueue ---------------//
    describe(("getQueue"), () => {
        test("It should resolve with return of a queue", async ()  => {
            //definisco una coda di test
            const date = new Date();
            const queue_input = new Queue(3, 3, date, 3);
            //Mock il metodo getQueue del DAO per restituire un oggetto Queue
            jest.spyOn(QueueDAO.prototype, "getQueue").mockResolvedValueOnce(queue_input);
            
            //controller
            const controller = new QueueController();

            //chiamare il metodo getQueue del controller
            const response = await controller.getQueue("3", new Date());

            //Aspettarsi che il metodo getQueue del DAO sia stato chiamato una volta sola
            expect(QueueDAO.prototype.getQueue).toHaveBeenCalledTimes(1);
            // Aspettarsi che sia stato chiamato con i parametri corretti
            expect(QueueDAO.prototype.getQueue).toHaveBeenCalledWith("3", date);
            
            //aspettarsi che la risposta sia void 
            expect(response).toEqual(queue_input);
        });

        test("It should reject with an error", async () => {
            //definisco una coda di test
            const date = new Date();
            const queue_input = new Queue(3, 3, date, 3);

            const error = new Error("Error during getQueue");

            //Mock il metodo getQueue del DAO per restituire un oggetto Queue
            jest.spyOn(QueueDAO.prototype, "getQueue").mockRejectedValueOnce(error);
            
            //controller
            const controller = new QueueController();

            //chiamare il metodo getQueue del controller
            await expect(controller.getQueue(queue_input.serviceId.toString(), date)).rejects.toThrow(error);

            //Aspettarsi che il metodo getQueue del DAO sia stato chiamato una volta sola
            expect(QueueDAO.prototype.getQueue).toHaveBeenCalledTimes(1);
            // Aspettarsi che sia stato chiamato con i parametri corretti
            expect(QueueDAO.prototype.getQueue).toHaveBeenCalledWith("3", date);
            
        });


    });

    //-------- addQueue -----------//
    describe(("addQueue"), () => {
        test("It should resolve void", async () => {
            //definisco una coda di test
            const date = new Date();
            const queue_input = new Queue(3, 3, date, 3);

            //Mock il metodo addQueue del DAO per restituire un oggetto Queue
            jest.spyOn(QueueDAO.prototype, "addQueue").mockResolvedValueOnce(undefined);
            
            //controller
            const controller = new QueueController();

            //chiamo il metodo addQueue del controller
            const response = await controller.addQueue(queue_input.serviceId.toString(), date);

            //Aspettarsi che il metodo addQueue del DAO sia stato chiamato una volta sola
            expect(QueueDAO.prototype.addQueue).toHaveBeenCalledTimes(1);
            // Aspettarsi che sia stato chiamato con i parametri corretti
            expect(QueueDAO.prototype.addQueue).toHaveBeenCalledWith(queue_input.serviceId.toString(), date);
            
            expect(response).toBe(undefined);
        });

        test("It should reject with an error", async () => {
            //definisco una coda di test
            const date = new Date();
            const queue_input = new Queue(3, 3, date, 3);

            const error = new Error("Error during addQueue");

            //Mock il metodo addQueue del DAO per restituire un oggetto Queue
            jest.spyOn(QueueDAO.prototype, "addQueue").mockRejectedValueOnce(error);
            
            //controller
            const controller = new QueueController();

            //chiamare il metodo addQueue del controller
            await expect(controller.addQueue(queue_input.serviceId.toString(), date)).rejects.toThrow(error);

            //Aspettarsi che il metodo addQueue del DAO sia stato chiamato una volta sola
            expect(QueueDAO.prototype.addQueue).toHaveBeenCalledTimes(1);
            // Aspettarsi che sia stato chiamato con i parametri corretti
            expect(QueueDAO.prototype.addQueue).toHaveBeenCalledWith(queue_input.serviceId.toString(), date);
            
        });
    });

    //-------- deleteQueue ----------------------------//
    describe(("deleteQueue"), () => {
        test("It should resolve void", async ()  => {
            //definisco una coda di test
            const date = new Date();
            const queue_input = new Queue(3, 3, date, 3);

            //Mock il metodo deleteQueue del DAO per restituire un oggetto Queue
            jest.spyOn(QueueDAO.prototype, "deleteQueue").mockResolvedValueOnce(undefined);
            
            //controller
            const controller = new QueueController();

            //chiamo il metodo deleteQueue del controller
            const response = await controller.deleteQueue(queue_input.serviceId.toString(), date);

            //Aspettarsi che il metodo deleteQueue del DAO sia stato chiamato una volta sola
            expect(QueueDAO.prototype.deleteQueue).toHaveBeenCalledTimes(1);
            // Aspettarsi che sia stato chiamato con i parametri corretti
            expect(QueueDAO.prototype.deleteQueue).toHaveBeenCalledWith(queue_input.serviceId.toString(), date);
            
            expect(response).toBe(undefined);
        });

        test("It should reject with an error", async ()  => {
            //definisco una coda di test
            const date = new Date();
            const queue_input = new Queue(3, 3, date, 3);

            const error = new Error("Error during deleteQueue");

            //Mock il metodo deleteQueue del DAO per restituire un oggetto Queue
            jest.spyOn(QueueDAO.prototype, "deleteQueue").mockRejectedValueOnce(error);
            
            //controller
            const controller = new QueueController();

            //chiamare il metodo deleteQueue del controller
            await expect(controller.deleteQueue(queue_input.serviceId.toString(), date)).rejects.toThrow(error);

            //Aspettarsi che il metodo deleteQueue del DAO sia stato chiamato una volta sola
            expect(QueueDAO.prototype.deleteQueue).toHaveBeenCalledTimes(1);
            // Aspettarsi che sia stato chiamato con i parametri corretti
            expect(QueueDAO.prototype.deleteQueue).toHaveBeenCalledWith(queue_input.serviceId.toString(), date);
            
        });
    });

    //-------- addCustomerToQueue ------------------------//
    describe(("addCustomerToQueue"), () => {
        test("It should resolve with return of a queue", async ()  => {
            //definisco una coda di test
            const date = new Date();
            const queue_input = new Queue(3, 3, date, 3);
            //Mock il metodo addCustomerToQueue del DAO per restituire un oggetto Queue
            jest.spyOn(QueueDAO.prototype, "addCustomerToQueue").mockResolvedValueOnce(queue_input);
            
            //controller
            const controller = new QueueController();

            //chiamare il metodo addCustomerToQueue del controller
            const response = await controller.addCustomerToQueue("3", new Date());

            //Aspettarsi che il metodo addCustomerToQueue del DAO sia stato chiamato una volta sola
            expect(QueueDAO.prototype.addCustomerToQueue).toHaveBeenCalledTimes(1);
            // Aspettarsi che sia stato chiamato con i parametri corretti
            expect(QueueDAO.prototype.addCustomerToQueue).toHaveBeenCalledWith("3", date);
            
            //aspettarsi che la risposta sia void 
            expect(response).toEqual(queue_input);
        });

        test("It should reject with an error", async ()  => {
            //definisco una coda di test
            const date = new Date();
            const queue_input = new Queue(3, 3, date, 3);

            const error = new Error("Error during addCustomerToQueue");

            //Mock il metodo addCustomerToQueue del DAO per restituire un oggetto Queue
            jest.spyOn(QueueDAO.prototype, "addCustomerToQueue").mockRejectedValueOnce(error);
            
            //controller
            const controller = new QueueController();

            //chiamare il metodo addCustomerToQueue del controller
            await expect(controller.addCustomerToQueue(queue_input.serviceId.toString(), date)).rejects.toThrow(error);

            //Aspettarsi che il metodo addCustomerToQueue del DAO sia stato chiamato una volta sola
            expect(QueueDAO.prototype.addCustomerToQueue).toHaveBeenCalledTimes(1);
            // Aspettarsi che sia stato chiamato con i parametri corretti
            expect(QueueDAO.prototype.addCustomerToQueue).toHaveBeenCalledWith("3", date);
            
        });
    });

});


import { describe, test, expect, jest, afterAll, beforeAll} from "@jest/globals"
import request from 'supertest'
import { app } from "../index"
import { cleanup } from '../src/db/cleanup'; // Import the cleanup function
import db from "../src/db/db"

import ServiceDAO from "../src/dao/serviceDAO"
import CounterDAO from "../src/dao/counterDAO"
import QueueDAO from "../src/dao/queueDAO";

const serviceDAO = new ServiceDAO();
const counterDAO = new CounterDAO();
const queueDAO = new QueueDAO();
const date = new Date();

const baseURL = "/officequeue/services/"

const getFormattedDate = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // I mesi partono da 0, quindi aggiungi 1
    const year = today.getFullYear();
  
    return `${day}/${month}/${year}`;
  };

async function createCounters() {
    await counterDAO.addCounter("Counter 1");
    await counterDAO.addCounter("Counter 2");
    await counterDAO.addCounter("Counter 3");
    await counterDAO.addCounter("Counter 4");
    await counterDAO.addCounter("Counter 5");
    await counterDAO.addCounter("Counter 6");
    await counterDAO.addCounter("Counter 7");
    await counterDAO.addCounter("Counter 8");
    await counterDAO.addCounter("Counter 9");
    await counterDAO.addCounter("Counter 10");
}

async function createServices() {
    await serviceDAO.addService("Financial Services", 10);
    await serviceDAO.addService("Payment Services", 7);
    await serviceDAO.addService("International Services", 12);
    await serviceDAO.addService("Information", 5);
    await serviceDAO.addService("Delivery", 8);
}

async function createCounterServices(){
    await counterDAO.addCounterService(1,1);
    await counterDAO.addCounterService(1,2);
    await counterDAO.addCounterService(2,3);
    await counterDAO.addCounterService(2,4);
    await counterDAO.addCounterService(3,5);
    await counterDAO.addCounterService(3,1);
}
async function createQueues() {
    await queueDAO.addQueue("1", date);
    await queueDAO.addQueue("2", date);
    await queueDAO.addQueue("3", date);
    await queueDAO.addQueue("4", date);
    await queueDAO.addQueue("5", date);
}

describe("Integration test of service", () => {
    describe("Integration of GET officequeue/services/waitingtime/:id", () => {
        test("get estimated time",async () => {
            await cleanup();
            //insert services at the counters
            await createCounterServices();
            //insert queues
            await createQueues();
            //insert ticket
            await db.run("INSERT INTO ticket(serviceId, position_queue, is_served) VALUES(1,1,0)");
            await db.run("INSERT INTO ticket(serviceId, position_queue, is_served) VALUES(1,2,0)");
            await db.run("INSERT INTO ticket(serviceId, position_queue, is_served) VALUES(1,3,0)");
            await db.run("INSERT INTO ticket(serviceId, position_queue, is_served) VALUES(1,4,0)");

            //insert customer to queue
            await queueDAO.addCustomerToQueue("1", new Date());
            await queueDAO.addCustomerToQueue("1", new Date());
            await queueDAO.addCustomerToQueue("1", new Date());
            await queueDAO.addCustomerToQueue("1", new Date());
            await queueDAO.addCustomerToQueue("1", new Date());

            //get estimated time
            const response = await request(app)
                                    .get(`${baseURL}waitingtime/1`);
            
            expect(response.status).toBe(200);
        })
    })
});
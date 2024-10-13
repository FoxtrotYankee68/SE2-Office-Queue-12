import { describe, test, expect, jest, afterEach, afterAll } from "@jest/globals"
import db from "../../src/db/db"
import { Database, RunResult } from "sqlite3"
import ServiceDAO from "../../src/dao/serviceDAO"
import exp from "constants"

jest.mock("../../src/db/db.ts")

// Reset all mocks after each test
afterEach(() => {
    jest.clearAllMocks();
});

afterAll(() => {
    jest.clearAllMocks();
})

describe("Service DAO", () => {
    test("It should return the waiting time for a service", async () => {
        const serviceDAO = new ServiceDAO();
    
        jest.spyOn(db, "get").mockImplementationOnce((sql: string, params: any[], callback) => {
            const row = { id: "2", name: "test", serviceTime: 10 };
            callback(null, row);
            return {} as Database;
        });
    
        jest.spyOn(db, "get").mockImplementationOnce((sql: string, params: any[], callback) => {
            const queueRow = { length: 5, date: "2023-01-01" };
            callback(null, queueRow);
            return {} as Database;
        });
    
        jest.spyOn(db, "all").mockImplementationOnce((sql: string, params: any[], callback) => {
            const counterRows = [{ "count(serviceId)": 3 }, { "count(serviceId)": 4 }];
            callback(null, counterRows);
            return {} as Database;
        });
    
        const result = await serviceDAO.estimateServiceWaitingTime("2");
    
        expect(result).toBeCloseTo(90.71, 2);
    });

    test("It should reject because there isn't a service with the specified id", async () => {
        const serviceDAO = new ServiceDAO();
    
        jest.spyOn(db, "get").mockImplementation((sql: string, params: any[], callback) => {
            callback(null, null);
            return {} as Database;
        });
    
        await expect(serviceDAO.estimateServiceWaitingTime("3")).rejects.toThrow("Service with this ID not found");
    });    

    test("It should reject because there isn't a queue with the specified id", async () => {
        const serviceDAO = new ServiceDAO();
        jest.spyOn(db, "get").mockImplementationOnce((sql: string, params: any[], callback) => {
            const row = { id: "2", name: "test", serviceTime: 10 };
            callback(null, row);
            return {} as Database;
        });

        jest.spyOn(db, "get").mockImplementationOnce((sql: string, params: any[], callback) => {
            callback(null, null); 
            return {} as Database;
        });

        await expect(serviceDAO.estimateServiceWaitingTime("2")).rejects.toThrow("No additional data found for serviceTime 10");
    });

    test("It should reject because there isn't a counter with the specified id", async () => {
        const serviceDAO = new ServiceDAO();
        jest.spyOn(db, "get").mockImplementationOnce((sql: string, params: any[], callback) => {
            const row = { id: "2", name: "test", serviceTime: 10 };
            callback(null, row);
            return {} as Database;
        });

        jest.spyOn(db, "get").mockImplementationOnce((sql: string, params: any[], callback) => {
            const queueRow = { length: 5, date: "2023-01-01" };
            callback(null, queueRow); 
            return {} as Database;
        });

        jest.spyOn(db, "all").mockImplementationOnce((sql: string, params: any[], callback) => {
            callback(null, []); 
            return {} as Database;
        });

        await expect(serviceDAO.estimateServiceWaitingTime("2")).rejects.toThrow("No counters found for serviceId 2 on date 2023-01-01");
    });

    test("It should reject with an error during db.get", async () => {
        const serviceDAO = new ServiceDAO();
        jest.spyOn(db, "get").mockImplementationOnce((sql: string, params: any[], callback) => {
            callback(new Error("Database error"), null); 
            return {} as Database;
        });

        await expect(serviceDAO.estimateServiceWaitingTime("2")).rejects.toThrow("Error retrieving service: Database error");
    });

    test("It should reject with an error during db.all", async () => {
        const serviceDAO = new ServiceDAO();
        jest.spyOn(db, "get").mockImplementationOnce((sql: string, params: any[], callback) => {
            const row = { id: "2", name: "test", serviceTime: 10 };
            callback(null, row); 
            return {} as Database;
        });

        jest.spyOn(db, "get").mockImplementationOnce((sql: string, params: any[], callback) => {
            const queueRow = { length: 5, date: "2023-01-01" };
            callback(null, queueRow); 
            return {} as Database;
        });

        jest.spyOn(db, "all").mockImplementationOnce((sql: string, params: any[], callback) => {
            callback(new Error("Database error"), null); 
            return {} as Database;
        });

        await expect(serviceDAO.estimateServiceWaitingTime("2")).rejects.toThrow("Error retrieving counter data: Database error");
    });
    
})

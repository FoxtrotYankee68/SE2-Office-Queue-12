import { describe, test, expect, beforeAll, afterAll, beforeEach, afterEach, jest } from "@jest/globals"
import serviceDAO from "../../src/dao/serviceDAO"
import { Service } from "../../src/components/service";
import db from "../../src/db/db";
import { Database } from "sqlite3";
import serviceController from "../../src/controllers/serviceController";

let controller: serviceController;
let dao: serviceDAO;

describe('serviceController/serviceDAO Integration tests', () => {

    const testName = "service X";
    const testId = 1;
    const testTime = 10;

    beforeAll(async () => {
        // Initialize the database connection

        // Ensure the test database is connected and tables exist
        await new Promise<void>((resolve, reject) => {
            db.run(`CREATE TABLE IF NOT EXISTS service
                    (
                        "id" INTEGER NOT NULL UNIQUE,
                        "name" TEXT NOT NULL UNIQUE,
                        "serviceTime" INTEGER NOT NULL,
                        PRIMARY KEY("id" AUTOINCREMENT)
                    )`, (err) => {
                if (err) reject(err);
                resolve();
            });
        });

        // Initialize DAO and controller
        controller = new serviceController();
        dao = new serviceDAO();
    });

    afterAll(async () => {
        // Close the database connection
        await new Promise<void>((resolve, reject) => {
            db.close((err) => {
                if (err) reject(err);
                resolve();
            });
        });
    });

    afterEach(async () => {
        // Clean up relevant tables before each test
        await new Promise<void>((resolve, reject) => {
            db.run('DELETE FROM service', (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    });

    describe('addService', () => {
        
        test("It should sucessfully add a new service", async () => {

            await expect(controller.addService(testName,testTime)).resolves.toBeUndefined();

            await expect(controller.getService(testId)).resolves.toStrictEqual({
                "id": 1,
                "name": "service X",
                "serviceTime": 10,
              });

        });

        test("It should throw an error if there is an error during insertion", async () => {

            const dbRunSpy = jest.spyOn(db, 'run').mockImplementation(function (sql, params, callback) {
                callback(new Error('Database error'), null);
                return {} as Database;
            });

            await expect(controller.addService(testName,testTime)).rejects.toThrow("Database error");

            dbRunSpy.mockRestore();


        });

    });

    describe('getService', () => {

        test("It should sucessfully return the service if it exists", async () => {

            await expect(controller.addService(testName,testTime)).resolves.toBeUndefined();

            await expect(controller.getService(testId)).resolves.toStrictEqual({
                "id": 1,
                "name": "service X",
                "serviceTime": 10,
              });


        });

        test("It should throw an error if the service is not in the database", async () => {

            await expect(controller.getService(testId)).rejects.toThrow(`Service with ID ${testId} not found`);

        });

        test("It should throw an error if there is a database error", async () => {

            const dbGetSpy = jest.spyOn(db, 'get').mockImplementation(function (sql, params, callback) {
                callback(new Error('Database error'), null);
                return {} as Database;
            });

            await expect(controller.getService(testId)).rejects.toThrow("Database error");

            dbGetSpy.mockRestore();
        
        });

    });

    describe('getServices', () => {

        test("It should sucessfully return all the services", async () => {
          
            await expect(controller.addService(testName,testTime)).resolves.toBeUndefined();

            await expect(controller.getServices()).resolves.toStrictEqual([{
                "id": 1,
                "name": "service X",
                "serviceTime": 10,
              }]);

        });

        test("It should return an empty array if there are no services", async () => {
           
            await expect(controller.getServices()).resolves.toStrictEqual([]);
        });

        test("It should throw an error if there is a database error", async () => {
    
            const dbAllSpy = jest.spyOn(db, 'all').mockImplementation(function (sql, params, callback) {
                callback(new Error('Database error'), null);
                return {} as Database;
            });

            await expect(controller.getServices()).rejects.toThrow("Database error");

            dbAllSpy.mockRestore();

        });

    });

    describe('deleteService', () => {
        test("It should sucessfully delete a service", async () => {
            
            await expect(controller.addService(testName,testTime)).resolves.toBeUndefined();

            await expect(controller.getServices()).resolves.toStrictEqual([{
                "id": 1,
                "name": "service X",
                "serviceTime": 10,
              }]);

            await expect(controller.deleteService(testName)).resolves.toBeUndefined();

            await expect(controller.getService(testId)).rejects.toThrow(`Service with ID ${testId} not found`);

        });

        test("It should throw an error if there is a database error", async () => {
           
            const dbRunSpy = jest.spyOn(db, 'run').mockImplementation(function (sql, params, callback) {
                callback(new Error('Database error'), null);
                return {} as Database;
            });

            await expect(controller.deleteService(testName)).rejects.toThrow("Database error");

            dbRunSpy.mockRestore();

        });

    });

    describe('editService', () => {

        test("It should sucessfully edit a service", async () => {
           
            await expect(controller.addService(testName,testTime)).resolves.toBeUndefined();

            await expect(controller.getServices()).resolves.toStrictEqual([{
                "id": 1,
                "name": "service X",
                "serviceTime": 10,
              }]);

           await expect(controller.editService(testName,"",2)).resolves.toBeUndefined();

           await expect(controller.getServices()).resolves.toStrictEqual([{
            "id": 1,
            "name": "",
            "serviceTime": 2,
          }]);


        });

        test("It should throw an error if there is a database error", async () => {

            const dbRunSpy = jest.spyOn(db, 'run').mockImplementation(function (sql, params, callback) {
                callback(new Error('Database error'), null);
                return {} as Database;
            });

            await expect(controller.editService(testName,"",2)).rejects.toThrow("Database error");

            dbRunSpy.mockRestore();
        });
    });

});

import { describe, afterEach, test, expect, beforeAll, afterAll, jest } from "@jest/globals"
import serviceDAO from "../../src/dao/serviceDAO"
import db from "../../src/db/db"
import { Service } from "../../src/components/service";
import { Database } from "sqlite3";

//jest.mock("crypto")
jest.mock("../../src/db/db.ts");

describe('serviceDAO', () => {

    afterEach(() => {
        jest.clearAllMocks(); // Clear all mocks after each test
    });

    const dao = new serviceDAO();
    const testName = "service X";
    const testId = 1;
    const testTime = 10;
    const mockService = new Service (testId,testName,testTime);
    const mockServices = [new Service (testId,testName,testTime), new Service (2)];
    const mockError = new Error('Database error');

    describe('addService', () => {
        test("It should sucessfully add a new service", async () => {
            jest.spyOn(db, 'run').mockImplementation((sql, params, callback) => {
                callback(null);
                return {} as Database;
            });

            await expect(dao.addService(testName,testTime)).resolves.toBeUndefined();
    
            expect(db.run).toHaveBeenCalledWith(
                "INSERT INTO service (name, serviceTime) VALUES (?,?)",
                [testName,testTime],
                expect.any(Function)
            );

        });

        test("It should throw an error if there is an error during insertion", async () => {
            jest.spyOn(db, 'run').mockImplementation((sql, params, callback) => {
                callback(mockError);
                return {} as Database;
            });

            await expect(dao.addService(testName,testTime)).rejects.toThrow(`Error inserting service: ${mockError.message}`);
    
            expect(db.run).toHaveBeenCalledWith(
                "INSERT INTO service (name, serviceTime) VALUES (?,?)",
                [testName,testTime],
                expect.any(Function)
            );

        });

    });

    describe('getService', () => {

        test("It should sucessfully return the service if it exists", async () => {
            jest.spyOn(db, 'get').mockImplementation((sql, params, callback) => {
                callback(null,mockService);
                return {} as Database;
            });

            await expect(dao.getService(testId)).resolves.toEqual(mockService);
    
            expect(db.get).toHaveBeenCalledWith(
                "SELECT * FROM service WHERE id = ?",
                [testId],
                expect.any(Function)
            );

        });

        test("It should throw an error if the service is not in the database", async () => {
            jest.spyOn(db, 'get').mockImplementation((sql, params, callback) => {
                callback(null,undefined);
                return {} as Database;
            });

            await expect(dao.getService(testId)).rejects.toThrow(`Service with ID ${testId} not found`);
    
            expect(db.get).toHaveBeenCalledWith(
                "SELECT * FROM service WHERE id = ?",
                [testId],
                expect.any(Function)
            );

        });

        test("It should throw an error if there is a database error", async () => {
            jest.spyOn(db, 'get').mockImplementation((sql, params, callback) => {
                callback(mockError,mockService);
                return {} as Database;
            });

            await expect(dao.getService(testId)).rejects.toThrow(`Error retrieving service: ${mockError.message}`);
    
            expect(db.get).toHaveBeenCalledWith(
                "SELECT * FROM service WHERE id = ?",
                [testId],
                expect.any(Function)
            );

        });


    });

    describe('getServices', () => {

        test("It should sucessfully return all the services", async () => {
            jest.spyOn(db, 'all').mockImplementation((sql, params, callback) => {
                callback(null,mockServices);
                return {} as Database;
            });

            await expect(dao.getServices()).resolves.toEqual(mockServices);
    
            expect(db.all).toHaveBeenCalledWith(
                "SELECT * FROM service",
                [],
                expect.any(Function)
            );

        });

        test("It should return an empty array if there are no services", async () => {
            jest.spyOn(db, 'all').mockImplementation((sql, params, callback) => {
                callback(null,[]);
                return {} as Database;
            });

            await expect(dao.getServices()).resolves.toEqual([]);
    
            expect(db.all).toHaveBeenCalledWith(
                "SELECT * FROM service",
                [],
                expect.any(Function)
            );

        });

        test("It should throw an error if there is a database error", async () => {
            jest.spyOn(db, 'all').mockImplementation((sql, params, callback) => {
                callback(mockError,mockServices);
                return {} as Database;
            });

            await expect(dao.getServices()).rejects.toThrow(`Error retrieving services: ${mockError.message}`);
    
            expect(db.all).toHaveBeenCalledWith(
                "SELECT * FROM service",
                [],
                expect.any(Function)
            );
        });


    });

    describe('deleteService', () => {
        test("It should sucessfully delete a service", async () => {
            jest.spyOn(db, 'run').mockImplementation((sql, params, callback) => {
                callback(null);
                return {} as Database;
            });

            await expect(dao.deleteService(testName)).resolves.toBeUndefined();;
    
            expect(db.run).toHaveBeenCalledWith(
                "DELETE FROM service WHERE name = ?",
                [testName],
                expect.any(Function)
            );
        });

        test("It should throw an error if there is a database error", async () => {
            jest.spyOn(db, 'run').mockImplementation((sql, params, callback) => {
                callback(mockError);
                return {} as Database;
            });

            await expect(dao.deleteService(testName)).rejects.toThrow(`Error deleting service: ${mockError.message}`);
    
            expect(db.run).toHaveBeenCalledWith(
                "DELETE FROM service WHERE name = ?",
                [testName],
                expect.any(Function)
            );
        });

    });

    describe('editService', () => {

        test("It should sucessfully edit a service", async () => {
            jest.spyOn(db, 'run').mockImplementation((sql, params, callback) => {
                callback(null);
                return {} as Database;
            });

            await expect(dao.editService(testName,"",testTime)).resolves.toBeUndefined();;
    
            expect(db.run).toHaveBeenCalledWith(
                "UPDATE service SET name = ?, serviceTime = ? WHERE name = ?",
                ["",testTime,testName],
                expect.any(Function)
            ); 
        });

        test("It should throw an error if there is a database error", async () => {
            jest.spyOn(db, 'run').mockImplementation((sql, params, callback) => {
                callback(mockError);
                return {} as Database;
            });
    
            await expect(dao.editService(testName,"",testTime)).rejects.toThrow(`Error editing service: ${mockError.message}`);
    
            expect(db.run).toHaveBeenCalledWith(
                "UPDATE service SET name = ?, serviceTime = ? WHERE name = ?",
                ["",testTime,testName],
                expect.any(Function)
            ); 
        });
    });

});
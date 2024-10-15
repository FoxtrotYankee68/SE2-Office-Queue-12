import { describe, beforeEach, test, expect, jest, afterAll, beforeAll } from "@jest/globals";
import request from 'supertest';
import ServiceController from "../../src/controllers/serviceController";
import ServiceDAO from "../../src/dao/serviceDAO";
import { Service } from "../../src/components/service";
import { app } from "../../index";
import { cleanup } from "../../src/db/cleanup";
import { setup } from "../../src/db/setup";
import db from "../../src/db/db";

const baseURL = "/officequeue/services";
const controller = new ServiceController();
const testName = "Service1";
const testId = 1;
const testTime = 10;
const newServiceTime = 15;
const testService = new Service(testId, testName, testTime);
const updatedService = new Service(testId, "", newServiceTime);

beforeEach(async () => {
    await cleanup();
    jest.clearAllMocks(); // Clear mocks after each test
});

beforeAll(async () => {
    await setup();
});

afterAll(async () => {
    await cleanup(); 
    // Close the database connection
    await new Promise<void>((resolve, reject) => {
        db.close((err) => {
            if (err) reject(err);
            resolve();
        });
    });
});

describe('serviceController/serviceRoutes Integration tests', () => {
    describe('POST /', () => {
        test('It should register a service and return 200 status', async () => {
            await request(app).post(baseURL + `/`).send({ name: testName, serviceTime: testTime }).expect(200);

            const response = await request(app).get(baseURL + `/${testId}`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(testService);
        });

        test('It should return 422 status if the body is missing', async () => {
            await request(app).post(baseURL + `/`).send({}).expect(422);
        });

        test('It should return 422 status if the service name is a string with length less than 3', async () => {
            await request(app).post(baseURL + `/`).send({ name: "ab", serviceTime: testTime }).expect(422);
        });

        test('It should return 422 status if the service time is not a number', async () => {
            await request(app).post(baseURL + `/`).send({ name: testName, serviceTime: "testTime" }).expect(422);
        });

        test('It should return 503 if there is an error', async () => {
            jest.spyOn(ServiceDAO.prototype, 'addService').mockRejectedValueOnce(new Error('Internal Server Error'));

            const response = await request(app).post(baseURL + `/`).send({ name: testName, serviceTime: testTime }).expect(200);
            expect(response.body.error).toBe('Internal Server Error');
        });

    });

    describe('GET /:id', () => {
        test('It should retrieve a specific service and return 200', async () => {
            await request(app).post(baseURL + `/`).send({ name: testName, serviceTime: testTime }).expect(503);

            const response = await request(app).get(baseURL + `/${testId}`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(testService);
        });

        test('It should return 422 if the service id is not numeric', async () => {
            await request(app).get(baseURL + `/abc`).expect(422);
        });

        test('It should return 503 if there is an error', async () => {
            jest.spyOn(ServiceDAO.prototype, 'getService').mockRejectedValueOnce(new Error('Internal Server Error'));

            const response = await request(app).get(baseURL + `/${testId}`).send({ name: testName, serviceTime: testTime }).expect(503);
            expect(response.body.error).toBe('Internal Server Error');
        });

    });

    describe('GET /', () => {
        test('It should retrieve all services and return 200', async () => {
            await request(app).post(baseURL + `/`).send({ name: testName, serviceTime: testTime }).expect(200);

            const response = await request(app).get(baseURL + `/`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual([testService]); 
        });
    
        test('It should return an empty array if no services exist', async () => {
            const response = await request(app).get(baseURL + `/`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual([]); 
        });

        test('It should return 503 if there is an error', async () => {
            jest.spyOn(ServiceDAO.prototype, 'getServices').mockRejectedValueOnce(new Error('Internal Server Error'));

            const response = await request(app).get(baseURL + `/`).send({ name: testName, serviceTime: testTime }).expect(503);
            expect(response.body.error).toBe('Internal Server Error');
        });
  
    });

    describe('PATCH /:name', () => {
        test('It should update a service and return 200', async () => {
            await request(app).post(baseURL + `/`).send({ name: testName, serviceTime: testTime }).expect(200);

            const response = await request(app).patch(baseURL + `/${testName}`).send({ newName: "", serviceTime: newServiceTime });
            expect(response.status).toBe(200);

            const updatedResponse = await request(app).get(baseURL + `/${testId}`);
            expect(updatedResponse.body).toEqual(updatedService);
        });

        test('It should return 422 if the new service name is missing', async () => {
            await request(app).post(baseURL + `/`).send({ name: testName, serviceTime: testTime }).expect(200);

            await request(app).patch(baseURL + `/${testName}`).send({ serviceTime: newServiceTime }).expect(422);
        });

        test('It should return 422 if the new service time is missing', async () => {
            await request(app).post(baseURL + `/`).send({ name: testName, serviceTime: testTime }).expect(200);

            await request(app).patch(baseURL + `/${testName}`).send({newName: ""}).expect(422);
        });

        test('It should return 503 if there is an error', async () => {
            jest.spyOn(ServiceDAO.prototype, 'editService').mockRejectedValueOnce(new Error('Internal Server Error'));

            const response = await request(app).patch(baseURL + `/${testName}`).send({ newName: testName, serviceTime: testTime }).expect(503);
            expect(response.body.error).toBe('Internal Server Error');
        });
    });

    describe('DELETE /:name', () => {
        test('It should delete a service and return 200', async () => {
            await request(app).post(baseURL + `/`).send({ name: testName, serviceTime: testTime }).expect(200);

            const deleteResponse = await request(app).delete(baseURL + `/${testName}`);
            expect(deleteResponse.status).toBe(200);

            const getResponse = await request(app).get(baseURL + `/${testId}`);
            expect(getResponse.body.error).toBe('Internal Server Error');
            expect(getResponse.status).toBe(503);
        });

        test('It should return 503 if there is an error', async () => {
            jest.spyOn(ServiceDAO.prototype, 'deleteService').mockRejectedValueOnce(new Error('Internal Server Error'));

            const response = await request(app).delete(baseURL + `/${testName}`).expect(503);
            expect(response.body.error).toBe('Internal Server Error');
        });

    });
});

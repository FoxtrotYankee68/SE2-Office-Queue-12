import { describe, beforeEach, afterEach, test, expect, jest } from "@jest/globals";
import request from 'supertest';
import serviceController from "../../src/controllers/serviceController";
import { app } from "../../index";
import { Service } from "../../src/components/service";

const baseURL = '/officequeue/services';

jest.mock("../../src/controllers/serviceController");

describe('Service Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /waitingtime/:id', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('It should return the waiting time for a service', async () => {
            const testId = "2";
            const expectedWaitingTime = 10;

            jest.spyOn(serviceController.prototype, "estimateServiceWaitingTime").mockResolvedValueOnce(expectedWaitingTime);

            const response = await request(app)
                .get(`${baseURL}/waitingtime/${testId}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ waitingTime: expectedWaitingTime });
            expect(serviceController.prototype.estimateServiceWaitingTime).toHaveBeenCalledWith(testId);
        });

        test('It should return 503 if there is an error', async () => {
            const testId = "4";

            jest.spyOn(serviceController.prototype, "estimateServiceWaitingTime").mockRejectedValueOnce(new Error("Database error"));

            const response = await request(app)
                .get(`${baseURL}/waitingtime/${testId}`);

            expect(response.status).toBe(503);
            expect(response.body.error).toBe("Internal Server Error");
        });

        test('It should return 422 if the service id is numeric', async () => {
            const num = 1; 
            const response = await request(app)
                .get(`${baseURL}/waitingtime/${Number(num)}`);
        
            expect(response.status).toBe(422);
            expect(response.body.error).toBe("Invalid service ID format.");
        });
        
    });
});

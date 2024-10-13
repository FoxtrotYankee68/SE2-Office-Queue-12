import { describe, afterEach, test, expect, beforeAll, afterAll, jest } from "@jest/globals"
import serviceDAO from "../../src/dao/serviceDAO"
import serviceController from "../../src/controllers/serviceController"
import { Service } from "../../src/components/service";

jest.mock("../../src/dao/serviceDAO.ts");

describe('serviceController', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    const dao = serviceDAO.prototype;
    const controller = new serviceController();
    const testName = "service X";
    const testId = "1";
    const testTime = 10;
    const mockService = new Service (testId,testName,testTime);
    const mockServices = [new Service (testId,testName,testTime), new Service ("2")];
    const mockError = new Error('Database error');

    describe('getEstimateServiceWaitingTime', () => {
        test('should return a number', async () => {
            dao.estimateServiceWaitingTime.mockResolvedValue(10);
            const result = await controller.estimateServiceWaitingTime(testId);
            expect(result).toBe(10);
        });
    });
});

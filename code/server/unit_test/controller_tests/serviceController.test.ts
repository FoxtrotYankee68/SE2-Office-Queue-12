import { describe, test, expect, jest, afterEach, afterAll } from "@jest/globals"
import db from "../../src/db/db"
import { Database, RunResult } from "sqlite3"
import ServiceDAO from "../../src/dao/serviceDAO"
import ServiceController from "../../src/controllers/serviceController"
import { Service } from "../../src/components/service"
import exp from "constants"

jest.mock("../../src/db/db.ts")

afterEach(() => {
    jest.clearAllMocks();
});

afterAll(() => {
    jest.clearAllMocks();

})

describe(("Service controller"), () => {
    describe(("estimateServiceWaitingTime"), () => {

        test("It should resolve with return of a service time", async () => {

            const serviceController = new ServiceController();
            const service = new Service("1", "test", 5);

            jest.spyOn(ServiceDAO.prototype, "estimateServiceWaitingTime").mockResolvedValue(service.serviceTime);

            const result = await serviceController.estimateServiceWaitingTime(1);
            expect(ServiceDAO.prototype.estimateServiceWaitingTime).toHaveBeenCalledTimes(1);
            expect(ServiceDAO.prototype.estimateServiceWaitingTime).toHaveBeenCalledWith(1);
            expect(result).toEqual(5);
        });

        test("It should reject with an error", async () => {

            const serviceController = new ServiceController();
            const service = new Service("1", "test", 5);

            jest.spyOn(ServiceDAO.prototype, "estimateServiceWaitingTime").mockRejectedValue("Error during estimate service time");

            await expect(serviceController.estimateServiceWaitingTime(1)).rejects.toEqual("Error during estimate service time");
            expect(ServiceDAO.prototype.estimateServiceWaitingTime).toHaveBeenCalledTimes(1);
            expect(ServiceDAO.prototype.estimateServiceWaitingTime).toHaveBeenCalledWith(1);
        });
    });
})
import express, { Router } from "express"
import ErrorHandler from "../helper"
import {body, oneOf, param, query} from "express-validator"
import ServiceController from "../controllers/serviceController";
import {Service} from "../components/service";

/**
 * Represents a class that defines the routes for handling proposals.
 */
class ServiceRoutes {
    private controller: ServiceController
    private readonly router: Router
    private errorHandler: ErrorHandler

    /**
     * Constructs a new instance of the ServiceRoutes class.
     */
    constructor() {
        this.controller = new ServiceController()
        this.router = express.Router()
        this.errorHandler = new ErrorHandler()
        this.initRoutes()
    }

    /**
     * Returns the router instance.
     * @returns The router instance.
     */
    getRouter(): Router {
        return this.router
    }

    initRoutes() {

        /**
         * Route for registering a new service in the db.
         * Requires the service's id, a non-empty string.
         */

        this.router.post(
            "/:id",
            param("id").isString().isLength({ min: 1 }),
            this.errorHandler.validateRequest,
            (req: any, res: any, next: any) => {
                try {
                    this.controller.addService(req.params.id);
                    res.status(200).end(); 
                } catch (err) {
                    next(err);
                }
            }
        );        
    }
}

export default ServiceRoutes
import express, { Router } from "express"
import ErrorHandler from "../helper"
import {body, oneOf, param, query} from "express-validator"
import QueueController from "../controllers/queueController";
import {Queue} from "../components/queue";

/**
 * Represents a class that defines the routes for handling proposals.
 */
class QueueRoutes {
    private controller: QueueController
    private readonly router: Router
    private errorHandler: ErrorHandler

    /**
     * Constructs a new instance of the ItemRoutes class.
     */
    constructor() {
        this.controller = new QueueController()
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

    /**
     * Initializes the routes for the product router.
     * 
     * @remarks
     * This method sets up the HTTP routes for handling product-related operations such as registering products, registering arrivals, selling products, retrieving products, and deleting products.
     * It can (and should!) apply authentication, authorization, and validation middlewares to protect the routes.
     * 
     */
    initRoutes() {

        /**
         * Retrieves a queue given the serviceId and the date.
         * @returns The queue's information.
         */
        this.router.get(
            "/:serviceId/:date",
            param("serviceId").isString().notEmpty(),
            param("date").isString().notEmpty(),
            this.errorHandler.validateRequest,
            (req: any, res: any, next: any) => {
                try {
                    this.controller.getQueue(req.params.serviceId, new Date(req.params.date)).then(
                        (queue: Queue) => res.status(200).json(queue)
                    )
                } catch (err) {
                    next(err);
                }
            }
        )

        /**
         * Adds a queue to the database
         */
        this.router.post(
            "/",
            body("serviceId").isString().notEmpty(),
            body("date").isString().notEmpty(),
            this.errorHandler.validateRequest,
            (req: any, res: any, next: any) => {
                try {
                    this.controller.addQueue(req.body.serviceId, new Date(req.body.date)).then(
                        () => res.status(200)
                    )
                } catch (err) {
                    next(err);
                }
            }
        )

        /**
         * Adds a customer to a queue (given the serviceId and date).
         * @returns The modified Queue item, to show its information to the requesting customer.
         */
        this.router.patch(
            "/:serviceId/:date",
            param("serviceId").isString().notEmpty(),
            param("date").isString().notEmpty(),
            this.errorHandler.validateRequest,
            (req: any, res: any, next: any) => {
                try {
                    this.controller.addCustomerToQueue(req.params.serviceId, new Date(req.params.date)).then(
                        (queue: Queue) => res.status(200).json(queue)
                    )
                } catch (err) {
                    next(err);
                }
            }
        )

        /**
         * Removes a queue from the database.
         */
        this.router.delete(
            "/:serviceId/:date",
            param("serviceId").isString().notEmpty(),
            param("date").isString().notEmpty(),
            this.errorHandler.validateRequest,
            (req: any, res: any, next: any) => {
                try {
                    this.controller.deleteQueue(req.params.serviceId, new Date(req.params.date)).then(
                        () => res.status(200)
                    )
                } catch (err) {
                    next(err);
                }
            }
        )

        /**
         * The only route actually needed.
         * Adds a customer to the current day's queue (given the serviceId).
         * @returns The modified Queue item, to show its information to the requesting customer.
         */
        this.router.patch(
            "/:serviceId",
            param("serviceId").isString().notEmpty(),
            this.errorHandler.validateRequest,
            (req: any, res: any, next: any) => {
                try {
                    this.controller.addCustomerToQueue(req.params.serviceId, new Date(Date.now())).then(
                        (queue: Queue) => res.status(200).json(queue)
                    )
                } catch (err) {
                    next(err);
                }
            }
        )
    }
}

export default QueueRoutes
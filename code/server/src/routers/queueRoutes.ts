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
            param("serviceId").notEmpty().isNumeric(),
            param("date").notEmpty().isString(),
            this.errorHandler.validateRequest,
            (req: any, res: any, next: any) => {
                this.controller.getQueue(req.params.serviceId, new Date(req.params.date)).then(
                    (queue: Queue) => res.status(200).json(queue)
                ).catch((err: Error) => {
                    next(err)
                })
            }
        )

        /**
         * Retrieves all the queues with a given serviceId.
         * @returns A list of retrieved queues.
         */
        this.router.get(
            "/:serviceId",
            param("serviceId").notEmpty().isNumeric(),
            this.errorHandler.validateRequest,
            (req: any, res: any, next: any) => {
                this.controller.getQueuesByService(req.params.serviceId).then(
                    (queues: Queue[]) => res.status(200).json(queues)
                ).catch(err => {
                    return next(err);
                })
            }
        )

        /**
         * Retrieves all the queues with a given date.
         * @returns A list of retrieved queues.
         */
        this.router.get(
            "/:date",
            param("date").notEmpty().isString(),
            this.errorHandler.validateRequest,
            (req: any, res: any, next: any) => {
                this.controller.getQueuesByDate(new Date(req.params.date)).then(
                    (queues: Queue[]) => res.status(200).json(queues)
                ).catch(err => {
                    return next(err);
                })
            }
        )

        /**
         * Retrieves all the queues in the database.
         * @returns A list of retrieved queues.
         */
        this.router.get(
            "/",
            this.errorHandler.validateRequest,
            (_: any, res: any, next: any) => {
                this.controller.getAllQueues().then(
                    (queues: Queue[]) => res.status(200).json(queues)
                ).catch(err => {
                    return next(err);
                })
            }
        )

        /**
         * Adds a queue to the database
         */
        this.router.post(
            "/",
            body("serviceId").notEmpty().isNumeric(),
            body("date").notEmpty().isString(),
            this.errorHandler.validateRequest,
            (req: any, res: any, next: any) => {
                this.controller.addQueue(req.body.serviceId, new Date(req.body.date)).then(
                    () => res.status(200)
                ).catch(err => {
                    return next(err);
                })
            }
        )

        /**
         * Edits a queue's information.
         */
        this.router.patch(
            ":serviceId/:date",
            param("serviceId").notEmpty().isNumeric(),
            param("date").notEmpty().isString(),
            body("length").notEmpty().isNumeric(),
            this.errorHandler.validateRequest,
            (req: any, res: any, next: any) => {
                this.controller.editQueue(req.params.serviceId, new Date(req.params.date), req.body.length).then(
                    () => res.status(200)
                ).catch(err => {
                    return next(err);
                })
            }
        )

        /**
         * Removes a queue from the database.
         */
        this.router.delete(
            "/:serviceId/:date",
            param("serviceId").notEmpty().isNumeric(),
            param("date").notEmpty().isString(),
            this.errorHandler.validateRequest,
            (req: any, res: any, next: any) => {
                this.controller.deleteQueue(req.params.serviceId, new Date(req.params.date)).then(
                    () => res.status(200)
                ).catch(err => {
                    return next(err);
                })
            }
        )

        /**
         * Removes all queues from the database.
         */
        this.router.delete(
            "/",
            this.errorHandler.validateRequest,
            (_: any, res: any, next: any) => {
                this.controller.deleteAllQueues().then(
                    () => res.status(200)
                ).catch(err => {
                    return next(err);
                })
            }
        )
    }
}

export default QueueRoutes
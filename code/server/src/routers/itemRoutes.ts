import express, { Router } from "express"
import ErrorHandler from "../helper"
import {body, oneOf, param, query} from "express-validator"
import ItemController from "../controllers/itemController";
import {Item} from "../components/item";

/**
 * Represents a class that defines the routes for handling proposals.
 */
class ItemRoutes {
    private controller: ItemController
    private readonly router: Router
    private errorHandler: ErrorHandler

    /**
     * Constructs a new instance of the ItemRoutes class.
     */
    constructor() {
        this.controller = new ItemController()
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
         * Route for registering a new item in the db.
         * Requires the item's id, a non-empty string.
         * Returns a 200 status code if the registration was successful.
         */
        this.router.post(
            "/:id",
            param("id").isString().isLength({ min: 1 }),
            this.errorHandler.validateRequest,
            (req: any, res: any, next: any) => this.controller.addItem(req.params.id)
                .then(() => res.status(200).end())
                .catch((err: any) => next(err))
        )

        /**
         * Route for retrieving an item.
         * Requires the item's id, a non-empty string.
         * Returns a 200 status code and the item's data if the selected item is present in the database.
         */
        this.router.get(
            "/:id",
            param("id").isString().isLength({ min: 1 }),
            this.errorHandler.validateRequest,
            (req: any, res: any, next: any) => this.controller.getItem(req.params.id)
                .then((item: Item) => res.status(200).json(item))
                .catch((err) => {
                    console.log(err)
                    next(err)
                })
        )
    }
}

export default ItemRoutes
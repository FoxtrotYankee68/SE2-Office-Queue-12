import express from "express"
import ErrorHandler from "./helper"
import CounterRoutes from "./routers/counterRoutes"
import ServiceRoutes from "./routers/serviceRoutes"
import QueueRoutes from "./routers/queueRoutes"

const morgan = require("morgan")
const prefix = "/officequeue"

function initRoutes(app: express.Application) {
    app.use(morgan("dev")) 
    app.use(express.json({ limit: "25mb" }))
    app.use(express.urlencoded({ limit: '25mb', extended: true }))


    const counterRoutes = new CounterRoutes();
    const serviceRoutes = new ServiceRoutes();
    const queueRoutes = new QueueRoutes();

    /**
     * The routes for the tickets, queues, counters are services are defined here.
    */

    app.use(`${prefix}/tickets`, counterRoutes.getRouter())
    app.use(`${prefix}/queues`, counterRoutes.getRouter())
    app.use(`${prefix}/counters`, counterRoutes.getRouter())
    app.use(`${prefix}/services`, serviceRoutes.getRouter())

    ErrorHandler.registerErrorHandler(app)
}

export default initRoutes
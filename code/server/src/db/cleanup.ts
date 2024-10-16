"use strict";

import db from "../db/db";

/**
 * Deletes all data from the database.
 * This function must be called before any integration test, to ensure a clean database state for each test run.
 */

export function cleanup() {
    db.serialize(() => {
        db.run("DELETE FROM counter_service");
        db.run("DELETE FROM queue");
        db.run("DELETE FROM ticket");
    })
}

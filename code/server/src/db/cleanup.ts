"use strict";

import db from "../db/db";

/**
 * Deletes all data from the database.
 * This function must be called before any integration test, to ensure a clean database state for each test run.
 */
export async function cleanup() {
    return new Promise<void>((resolve, reject) => {
        db.serialize(() => {
            db.run("DELETE FROM counter", (err: any) => {
                if (err) return reject(new Error("Failed to delete from counter: " + err.message));
                db.run("DELETE FROM counter_service", (err: any) => {
                    if (err) return reject(new Error("Failed to delete from counter_service: " + err.message));
                    db.run("DELETE FROM service", (err: any) => {
                        if (err) return reject(new Error("Failed to delete from service: " + err.message));
                        db.run("DELETE FROM queue", (err: any) => {
                            if (err) return reject(new Error("Failed to delete from queue: " + err.message));
                            resolve();
                        });
                    });
                });
            });
        });
    });
}

"use strict"

import db from "../db/db";

/**
 * Deletes all data from the database.
 * This function must be called before any integration test, to ensure a clean database state for each test run.
 */

export function cleanup() {
    db.serialize(() => {
        return new Promise<void>((resolve, reject) => {
            db.run("DELETE FROM counter", (err: any, _: any) => {
                if (err) return reject();
                db.run("DELETE FROM service", (err: any, _: any) => {
                    if (err) return reject();
                    db.run("DELETE FROM counter_service", (err: any, _: any) => {
                        if (err) return reject();
                        db.run("DELETE FROM queue", (err: any, _: any) => {
                            if (err) return reject();
                            db.run("DELETE FROM sqlite_sequence", (err: any, _: any) => {
                                if (err) return reject();
                                resolve();
                            });
                        });
                    });
                });
            });
        });
    })
}
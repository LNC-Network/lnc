import { MongoClient } from "mongodb";
//for mongodb type error handling

/* eslint no-var: "off" */
/* eslint prefer-const: "off" */

declare global {
    var mongoClientPromise: Promise<MongoClient> | undefined;
}
export { };

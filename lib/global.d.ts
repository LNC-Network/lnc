import { MongoClient } from "mongodb";
//for mongodb type error handling
declare global {
    var mongoClientPromise: Promise<MongoClient> | undefined;
}
export { };

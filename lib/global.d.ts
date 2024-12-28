import { MongoClient } from "mongodb";

/*Ensures a single MongoDB client instance across the app, particularly for serverless environments.
Do not modify or remove without understanding its purpose.*/
declare global {
  //dont remove this below line from here it only works in this line only
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;

  interface Window {
    scrollY: number;
  }
}
export {};

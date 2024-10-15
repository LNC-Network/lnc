import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
    throw new Error("Missing MONGODB_URI in environment variables");
}

if (process.env.NODE_ENV === "development") {
    // In development, use a cached MongoClient instance to prevent opening multiple connections
    if (!global.mongoClientPromise) {
        client = new MongoClient(uri);
        global.mongoClientPromise = client.connect();
    }
    clientPromise = global.mongoClientPromise;
} else {
    // In production, create a new MongoClient instance for each request
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export default clientPromise;

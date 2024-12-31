import { MongoClient } from "mongodb";

const uri: string | undefined = process.env.MONGODB_URI;

if (!uri) {
  // throw new Error("Missing MONGODB_URI in environment variables");
}

let client: MongoClient;
const clientPromise: Promise<MongoClient> = (async () => {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri || "");
    global._mongoClientPromise = client.connect();
  }
  return global._mongoClientPromise;
})();

// Close MongoDB connection on application shutdown
const closeMongoConnection = async () => {
  try {
    if (client) {
      console.log("Closing MongoDB connection...");
      await client.close();
      console.log("MongoDB connection closed.");
    }
  } catch (error) {
    console.error("Error while closing MongoDB connection:", error);
  }
};

// termination of connection
process.on("SIGINT", async () => {
  console.log("Received SIGINT signal.");
  await closeMongoConnection();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Received SIGTERM signal.");
  await closeMongoConnection();
  process.exit(0);
});

export default clientPromise;

declare global {
  // MongoDB client promise for database connections
  let mongoClientPromise: Promise<MongoClient> | undefined;

  // Add any other global declarations here
  interface Window {
    scrollY: number; // For VideoEffect component
  }
}

// Required for TypeScript module augmentation
export {};

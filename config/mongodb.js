import { MongoClient } from "mongodb";

let mongodbClient;

export default async () => {
  try {
    if (mongodbClient) return mongodbClient;
    mongodbClient = await new MongoClient(process.env.MONGODB_URI).connect();
    return mongodbClient;
  } catch (e) {
    console.error(e);
  }
};

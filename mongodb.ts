import { MongoClient } from "mongodb";

const url = `mongodb+srv://donson:${process.env.MONGO_PASSWORD}@donson.ud1ok3i.mongodb.net/?retryWrites=true&w=majority&appName=donson`;
const client = new MongoClient(url);
let connectDB: Promise<MongoClient>;

declare global {
  var _mongo: Promise<MongoClient> | undefined;
}

if (!global._mongo) global._mongo = client.connect();
connectDB = global._mongo;

export { connectDB };

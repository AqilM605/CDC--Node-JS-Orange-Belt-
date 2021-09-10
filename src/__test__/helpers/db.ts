import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoServer = async () => {
  return await MongoMemoryServer.create();
};

export const connect = async () => {
  await mongoose.disconnect();
  mongoServer().then((server) => {
    mongoose.connect(server.getUri(), {
      useNewUrlParser: true,
      dbName: "verifyMASTER",
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("memory server connected");
  });
};

export const close = async () => {
  await mongoose.disconnect();
};

export const clear = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

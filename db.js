const { MongoClient } = require("mongodb");

const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI;
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    maxPoolSize: 2,
  };

  try {
    const client = new MongoClient(uri, options);
    await client.connect();
    console.log("Connected to MongoDB database");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB database", error);
    throw error;
  }
};

module.exports = connectDatabase;

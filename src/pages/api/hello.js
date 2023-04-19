const connectDatabase = require("../../../db");

export default async function handler(req, res) {
  try {
    const client = await connectDatabase();
    const db = await client.db("test");
    const data = await db.collection("comments").find({}).toArray();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json("Internal server error" + error);
  }
}

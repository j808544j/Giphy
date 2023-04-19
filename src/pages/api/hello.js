export default async function handler(req, res) {
  try {
    res.status(200).json("data");
  } catch (error) {
    res.status(500).json("Internal server error" + error);
  }
}

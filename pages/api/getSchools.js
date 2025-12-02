import { db } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const [rows] = await db.query(
      "SELECT id, name, address, city, image FROM schools ORDER BY id DESC"
    );

    return res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching schools:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

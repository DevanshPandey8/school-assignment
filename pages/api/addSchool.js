import { db } from "../../lib/db";
import { upload } from "../../lib/multer";

// Next.js needs bodyParser disabled for multer
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to run middleware (multer) in Next.js API
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Run multer middleware to process image upload
    await runMiddleware(req, res, upload.single("image"));

    // After multer, req.body has text fields, req.file has image info
    const { name, address, city, state, contact, email_id } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imagePath = `/schoolImages/${req.file.filename}`;

    // Insert into MySQL
    const [result] = await db.query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, imagePath, email_id]
    );

    return res.status(200).json({
      message: "School added successfully",
      id: result.insertId,
      imagePath,
    });
  } catch (error) {
    console.error("Error in addSchool API:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

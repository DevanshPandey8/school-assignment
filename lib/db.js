import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",   // leave empty for XAMPP default
  database: "school_assignment",
});

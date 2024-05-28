import express from "express";
import cors from "cors";
import { createPool } from "mysql2";

const app = express();
app.use(cors());
app.use(express.json());

console.log("Starting database connection...");

const pool = createPool({
  host: "mysql",
  user: "root",
  password: "your_root_password",
  port: 3306,
  database: "test",
});

function connectToDatabase() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error connecting to database:", err);
        reject(err);
      } else {
        console.log("Connection to database established");
        connection.release();
        resolve();
      }
    });
  });
}

async function waitForDatabase() {
  while (true) {
    try {
      console.log('Trying to connect to database...');
      await connectToDatabase();
      break;
    } catch (err) {
      console.log('Retrying in 5 seconds...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

waitForDatabase().then(() => {
  app.get("/", (req, res) => {
    res.json("hello");
  });

  app.get('/ping', (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error on connection:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      
      connection.query('SELECT NOW()', (error, result) => {
        connection.release();
        if (error) {
          console.error("Error on query SELECT NOW():", error);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }
        
        res.json(result);
      });
    });
  });

  app.get("/phoneNumbers", (req, res) => {
    console.log("Query on GET /phoneNumbers");
    const q = "SELECT * FROM phoneNumbers";
    pool.query(q, (err, data) => {
      if (err) {
        console.log("Error on query SELECT:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.json(data);
    });
  });

  app.post("/phoneNumbers", (req, res) => {
    console.log("POST request received on /phoneNumbers");
    const q = "INSERT INTO phoneNumbers(`phoneNumber`, `company`, `name`) VALUES (?, ?, ?)";

    const values = [
      req.body.phoneNumber,
      req.body.company,
      req.body.name,
    ];

    pool.query(q, values, (err, data) => {
      if (err) {
        console.log("Error on INSERT query:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.json(data);
    });
  });

  app.delete("/phoneNumbers/:id", (req, res) => {
    console.log("DELETE request received on /phoneNumbers/:id");
    const phoneNumberId = req.params.id;
    const q = "DELETE FROM phoneNumbers WHERE id = ?";

    pool.query(q, [phoneNumberId], (err, data) => {
      if (err) {
        console.log("Error on DELETE query:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.json(data);
    });
  });

  app.put("/phoneNumbers/:id", (req, res) => {
    console.log("PUT request received on /phoneNumbers/:id");
    const phoneNumberId = req.params.id;
    const q = "UPDATE phoneNumbers SET `phoneNumber`= ?, `company`= ?, `name`= ? WHERE id = ?";

    const values = [
      req.body.phonenumber,
      req.body.company,
      req.body.name,
      phoneNumberId,
    ];

    console.log("Data to update:", req.body); // Log of received data for update

    pool.query(q, values, (err, data) => {
      if (err) {
        console.log("Error on UPDATE query:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.json(data);
    });
  });

  app.listen(5000, () => {
    console.log("Backend ready on port 5000.");
  });
}).catch(err => {
  console.error('Error waiting for the database:', err);
});

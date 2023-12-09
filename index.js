import connectToMongo from "./db.mjs";
import express from "express";
import auth from './routes/auth.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { fileURLToPath } from "url";
import { dirname } from "path";
import { appendFile } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connectToMongo();
const app = express();
const port = 8000;
app.use(express.json()); // For sending our json request to the server.

app.use(cookieParser());

app.use(cors())
app.get("/", (req, res) => {
  res.send("Hello World Express!");
});
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use("/api/auth", auth);



app.get("/contact", (req, res) => {
  res.send("Hello World Express!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

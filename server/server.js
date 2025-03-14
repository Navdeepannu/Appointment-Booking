import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(cors());

// endpoints
app.get("/", (req, res) => {
  res.send("Api working at /");
});

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});

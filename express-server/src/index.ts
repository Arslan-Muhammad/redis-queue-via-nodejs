import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());
const client = createClient();

client.connect();

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/submit", async (req, res) => {
  const { problemId, userId, code } = req.body;

  try {
    await client.lPush(
      "Submissions",
      JSON.stringify({ problemId, userId, code })
    );

    res.json({
      message: "Submission recieved.",
    });
  } catch (error) {
    res.json({
      message: "Submission failed!",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is listenenig!");
});

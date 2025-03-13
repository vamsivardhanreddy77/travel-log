const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const MONGO_URI = "mongodb+srv://vamsireddynani328:Vamsi10221022@cluster0.b1rfc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));
const logSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now }
});
const Log = mongoose.model("Log", logSchema);
app.get("/", async (req, res) => {
  try {
    const logs = await Log.find();
    res.render("index", { logs });
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).send("Error fetching logs");
  }
});
app.get("/add-log", (req, res) => {
  res.render("add-log");
});
app.post("/add-log", async (req, res) => {
  const { title, description } = req.body;
  try {
    await Log.create({ title, description });
    res.redirect("/");
  } catch (err) {
    console.error(" Error adding log:", err);
    res.status(500).send("Error adding log");
  }
});
const PORT = 5000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));

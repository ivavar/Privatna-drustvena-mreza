const express = require("express");
const app = express();
const PORT = 5000;

const connectDB = require("./config/db");

connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API is running"));

app.use("/api/admin", require("./routes/admin"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/profile", require("./routes/profile"));

app.listen(PORT, () => console.log(`Server is started on ${PORT}`));

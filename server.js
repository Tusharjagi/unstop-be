const express = require("express");
const config = require("config");
const cors = require("cors");
const connectDB = require("./utils/db");
const hotels = require("./routes/hotels");

const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: config.get("corsOrigin") || "*",
};

app.use(cors(corsOptions));

app.use(express.json());

connectDB();

app.use("/api", hotels);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

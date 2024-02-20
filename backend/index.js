const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const PORT = 3000;
const cookieParser = require("cookie-parser");
const connectDB = require("./database/databaseConnection");
const mongoose = require("mongoose");

// connect to mongodb
connectDB();

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// to parse cookies sent with request
app.use(cookieParser());

// routes
app.use("/auth", require("./routes/auth"));
app.use("/employees", require("./routes/api/employees"));
app.use("/users", require("./routes/users"));

// global router catcher
app.all("*", (req, res) => {
    res.send("Hello!");
});

mongoose.connection.once("open", () => {
    console.log("connected to DB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

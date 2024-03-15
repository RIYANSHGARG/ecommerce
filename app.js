const express = require("express")
const app = express();
const errorMiddleware = require("./middleware/error")
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

// Route imports
const product = require("e:/WebDevlopment Practice/Mern Project (Ecommerce)/Backend/Routes/productroute");
const user = require("./routes/userRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);


// Middleware for errors
app.use(errorMiddleware);


module.exports = app;
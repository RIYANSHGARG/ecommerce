const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const { connect } = require("mongoose");

// handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error : ${err}`);
    console.log(`shutting down the server due to unhandled uncaught exception`);
    process.exit(1);
})

// config
dotenv.config({ path: "Backend/config/config.env" })

// Connecting Database
connectDatabase();

const server = app.listen(process.env.PORT, async () => {
    console.log(`Server is Working on http://localhost:${process.env.PORT}`);
});


//  unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error : ${err.message}`);
    console.log("Server is shutdown due to unhandled promise rejection");

    server.close(() => {
        process.exit(1);
    });
});

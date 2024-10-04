const express = require("express");
const cors = require("cors");  // Ensure you import the cors module

const app = express();  // Initialize the express application

app.use(cors());  // Use CORS middleware
app.use(express.json());  // Middleware to parse JSON bodies

const mainRouter = require('./routes/mainR');  // Import your main router

app.use("/api/v1", mainRouter);  // Use the main router with a prefix

const PORT = 3000;  // Define the port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require("express");
app.use(cors());
app.use(express.json());
const mainRouter = require('./routes/mainR')
const app = express();


app.use("/api/v1",mainRouter);
app.listen(3000);
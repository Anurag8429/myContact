const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const app = express();

const port = process.env.PORT || 500;

app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoute"));
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});

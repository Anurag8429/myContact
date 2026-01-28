const express = require("express");
const dotenv = require("dotenv").config();
const app = express();

const port = process.env.PORT || 500;

app.use("/api/contacts",require("./routes/contactRoute"));

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});

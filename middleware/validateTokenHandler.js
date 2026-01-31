const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(req,res,next)=>{
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("User is not authorized or token is missing");
    }

    const token = authHeader.split(" ")[1];

    try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user;
    next();
    }catch (error) {
    res.status(401);
    throw new Error("Invalid or expired token");
  }
});

module.exports = validateToken;
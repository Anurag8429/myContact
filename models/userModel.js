const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true, "Please add the user name"],
    },

    email : {
        type : String,
        required : [true, "Please add the user email"],
        unique : [true, "Email address already taken "],
    },

    password : {
        type : String,
        required : [true, "add the user password"],
    },
},{
    timestamps : true,
})

mongoose.exports = mongoose.model("User",userSchema);
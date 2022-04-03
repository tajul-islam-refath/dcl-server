const { Schema, model } = require("mongoose")

const adminSchema = new Schema({
    name: {
        type: "String",
        trim: true,
        required: true
    },
    email: {
        type: "String",
        trim: true,
        required: true
    },
    password: {
        type: "String",
        trim: true,
        required: true
    },
    role: {
        type: "String",
        default: "admin"
    }
})

const Admin = model("Admin", adminSchema);
module.exports = Admin;
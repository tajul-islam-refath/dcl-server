const { Schema, model } = require("mongoose")

const adoutSchema = new Schema({
    about: {
        type: "String",
        trim: true,
        required: true
    },
    image: {
        type: "String",
        required: true
    },
    adminId: {
        type: Schema.ObjectId
    }
})

const About = model("About", adoutSchema);
module.exports = About;
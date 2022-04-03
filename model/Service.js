const { Schema, model } = require("mongoose")

const serviceSchema = new Schema({
    title: {
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

const Service = model("Service", serviceSchema);
module.exports = Service;
const {Schema, model} = require('mongoose');
const schema = new Schema(
    {
        url: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        ram : {
            type: Number,
            required: true
        },
        memory: {
            type: Number,
            required: true
        },
        screen: {
            type: Number,
            required: true
        },
        screenType: {
            type: String,
            required: true
        },
        screenResolution: {
            type: String,
            required: true
        }
    }
);

module.exports = model('Tablet', schema);
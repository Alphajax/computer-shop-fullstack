const {Schema, model} = require('mongoose');

const schema = new Schema({
    cartId : {
        type: String,
        required: true
    },
    type: {
        type:String,
        required: true
    },
    name: {
        type: String
    },
    productId : {
        type: String,
        required: true,
    },
    amount : {
        type: Number,
        required: true
    }
});

module.exports = model('Item', schema)

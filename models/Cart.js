const {Schema, model} = require('mongoose');

const schema = new Schema({
    userId : {
        type: String,
        required: true
    },
    isActive :{
        type: Boolean,
        required: true,
        default: true,
    }
});

module.exports = model('Cart', schema);

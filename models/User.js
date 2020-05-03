const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  role: {type:String, required: true, default: 'user'},
  password: {type: String, required: true},
  address: {type:String},
  phone: {type: String}
})

module.exports = model('User', schema)

let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({

    username: {type:String, unique: true, required: true},
    password: {type:String, required: true},
    firstname: String,
    lastname:String,
    
})



let User= mongoose.model('User', userSchema)
module.exports = User
let mongoose = require('mongoose')

let datematchSchema = new mongoose.Schema({

    username: {type:String, unique: true, required: true},
    password: {type:String, required: true},
    firstname: String,
    lastname:String,
    
})



let Datematch= mongoose.model('Datematch', datematchSchema)
module.exports = Datematch
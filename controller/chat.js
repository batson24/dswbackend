let express=  require('express')
let chat= express.Router()

chat.get('/inbox',(req,res)=>{
    res.send({ response: "Server is up and running." }).status(200);
})

module.exports = chat
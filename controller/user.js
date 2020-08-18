let express= require('express')
let bcrypt = require('bcrypt')
let user= express.Router()
let User= require('../models/user.js')



user.post('/login',(req,res)=>{
    console.log(req.body)
    User.findOne({username:req.body.username}, (err, foundUser)=>{
        console.log(foundUser)
    
    if (!foundUser){
        res.status(400).json({error:message})
    } else{
        if (bcrypt.compareSync(req.body.password, foundUser.password)){
            res.status(200).json(foundUser)} else{
                console.log('failed')
            }
        }
    
    })
})

user.delete('/delete', (req, res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
      console.log(foundUser)
      User.findByIdAndDelete(foundUser.id, (err, data) => {
        
    })
  
    })
  })

  // Sign up route
user.post('/signup', async (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  console.log(req.body)
  User.create(req.body, (err, createdUser) => {
    if (err) {
        console.log(err)
        res.status(400).json({error: error.message})
        console.log(error)
    }
        res.status(200).send(createdUser)
  })
})

module.exports = user

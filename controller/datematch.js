let express = require('express')
let datematch = express.Router()
let Datematch = require('../models/datematch.js')

// INDEX Route
datematch.get('/', (req, res) => {
    Datematch.find({}, (err, foundDatematch) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(foundDatematch)
    })
  })

// POST Route
datematch.post('/', async (req, res) => {
    Datematch.create(req.body, (error, createdDatematch) => {
      if (error) {
        res.status(400).json({ error: error.message })
      }
      res.status(200).send(createdDatematch) 
    })
  })
  
// UPDATE Route
datematch.put('/:id', (req, res) => {
    Datematch.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedDatematch) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(updatedDatematch)
    })
  })

  // DELETE Route
  datematch.delete('/:id', (req, res) => {
    Datematch.findByIdAndRemove(req.params.id, (err, deletedDatematch) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(deletedDatematch)
    })
  })

  //Find user route 
  datematch.post('/username' , (re,res)=>{
    Datematch.findById(req.params.username, (err, foundDatematch) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(foundDatematch)
    })
  })



// SEED ROUTE for DB //




module.exports = datematch
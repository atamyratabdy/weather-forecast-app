const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

process.env.SECRET_KEY = 'secret'

router.post('/users/login', (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (req.body.password == user.password) {
          const payload = {
            first_name: user.first_name,
            last_name: user.last_name
          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.status(200).send(token)
        } else {
          res.status(401).json({ error: 'Password is not correct' })
          res.end()
        }
      } else {
        res.status(404).json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = router

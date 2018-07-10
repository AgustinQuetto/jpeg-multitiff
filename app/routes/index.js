const express = require('express')
const router = express.Router()
const sharp = require('sharp')
const fs = require('fs')

router.post('/', (req, res, next) => {
  let base64 = []
  let front = Buffer.from(req.body.front, 'base64')
  let back = Buffer.from(req.body.back, 'base64')

  sharp(front)
    .toFile('public/images/output/front.tif')
    .then(data => {
      sharp(back)
        .toFile('public/images/output/back.tif')
        .then(data => {
          base64.push({'front': Buffer.from(fs.readFileSync('public/images/output/front.tif')).toString('base64')})
          base64.push({'back': Buffer.from(fs.readFileSync('public/images/output/back.tif')).toString('base64')})
          res.json(base64)
        })
        .catch(err => console.log(`downsize issue ${err}`))
    })
    .catch(err => console.log(`downsize issue ${err}`))
})

router.post('/merge', (req, res, next) => {
  res.sendStatus(200)
})

module.exports = router

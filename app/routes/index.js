const express = require('express')
const router = express.Router()
const sharp = require('sharp')
const fs = require('fs')

router.post('/', (req, res, next) => {
  let imgBuffer = Buffer.from(req.body.imagen, 'base64')
  sharp(imgBuffer)
    .toFile('public/images/output/SP0001.tif')
    .then(data => {
      console.log(data)
      let bitmap = fs.readFileSync('public/images/output/SP0001.tif')
      res.json({'tiff-image': Buffer.from(bitmap).toString('base64')})
    })
    .catch(err => console.log(`downsize issue ${err}`))
})

router.post('/merge', (req, res, next) => {
  res.sendStatus(200)
})

module.exports = router

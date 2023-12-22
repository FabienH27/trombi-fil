const express = require('express')
const multer = require('multer')
const app = express()
const port = 3000

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({storage})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/images/company', upload.single('company'), function(req, res, next) {
  res.json({message: 'File uploaded successfully'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

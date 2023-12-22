import express from 'express'
import multer from 'multer'
import cors from 'cors'
import * as url from 'url'
const app = express()
const port = 3000
const _dirname = url.fileURLToPath(new URL('.', import.meta.url))

import students from './students.js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({storage})

app.use(cors());

// app.use(express.static(_dirname + '/images/companies'))
// app.use(express.static(_dirname + '/images/avatars/'))

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/students', (req, res) => {  
  res.status(200).json(students);
});

app.get('images/company/1', (req, res) => {
  
});

app.post('/images/company', upload.single('company'), function(req, res, next) {
  res.json({message: 'File uploaded successfully'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

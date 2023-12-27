import express from 'express'
import multer from 'multer'
import cors from 'cors'
import fs from 'fs-extra';
import bodyParser from 'body-parser';

const app = express()
const port = 3000

import students from './students.js'

app.use(cors());
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.params.type;
    console.log(type);
    let path = `./public/images/${type}`
    if(!fs.existsSync(path)){
      fs.mkdirSync(path);
    }
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]
  if(!allowedTypes.includes(file.mimetype)){
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false);
  }
  cb(null, true);
}

const upload = multer({storage, fileFilter})

app.use((err, req, res, next) => {
  if(err.code === "INCORRECT_FILETYPE"){
    res.status(422).json({error: 'Only images are allowed'});
  }
})

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/students', (req, res) => {  
  res.status(200).json(students);
});

app.post('/upload/:type', upload.single('file'), (req, res) => {
  const originalFileName = req.file?.originalname ?? '';
  const filePath = `public/images/${req.params.type}` + originalFileName;
  res.json({file: filePath});
});


app.post('/students/create', (req, res) => {
  const content = req.body;
  students.push(content);  
  res.status(200).json({student: content});
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

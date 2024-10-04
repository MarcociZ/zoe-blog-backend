import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from 'cors';
import fs from "fs";
import { registerValidation, loginValidation, postCreateValidation } from "./validations.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js"
import { UserController, PostController } from './controllers/index.js'


mongoose
    .connect('mongodb+srv://zmarcoci:c88bsAoUb02ZZVH7@project0.ayfb5.mongodb.net/myblog?retryWrites=true&w=majority&appName=Project0',)
    .then(() => { console.log('DB Ok'); })
    .catch((err) => console.log('Db error: ', err));

const app = express();

app.listen(4444, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Server Ok');
});

const storage = multer.diskStorage(
    {
        destination: (_, __, cb) => {
            if (!fs.existsSync('uploads')) {
                fs.mkdirSync('uploads');
            }
            cb(null, 'uploads');
        },
        filename: (_, file, cb) => {
            cb(null, file.originalname);
        },
    }
);

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.post('/auth/login', UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/uploads', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
})

app.get('/tags', PostController.getLastTags);


app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);



//loginValidation, handleValidationErrors,

//Mongo c88bsAoUb02ZZVH7
//mongodb+srv://zmarcoci:<db_password>@project0.ayfb5.mongodb.net/?retryWrites=true&w=majority&appName=Project0
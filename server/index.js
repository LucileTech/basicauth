const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = express.Router(); 
const UserModel = require('./models/model.user') 
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
// const isAuthenticated = require("./middlewares/jwt.middleware");

const app = express(); 
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/authsept2023')

let privateKey = 'test123';



app.get('/', (req, res) => { 
res.json('Hello World')
}); 

app.get('/user',  async (req, res, next) => {
    const { email } = req.body
    console.log(req.body)
    console.log('Hello')

    try {
        // const foundUser = await UserModel.deleteOne(
        //     { email }
        // )
        if ( isNil(email) ) return res.json("not valid input")

        const foundUserByMail = await UserModel.findOne(
        {email: email }
        //     , (err, numberRemoved) => {
        //     if(numberRemoved === 0) next(new Error(`${email} was not found.`));
        //   } 
        )

        res.status(200).json(foundUserByMail)
    }

    catch (err) {
        res.json(err)
    }
})

app.delete('/delete',  async (req, res, next) => {
    const { email } = req.body
    console.log(req.body)

    try {
        // const foundUser = await UserModel.deleteOne(
        //     { email }
        // )
        if ( isNil(email) ) return res.json("not valid input")

        await UserModel.findOneAndDelete(
        {email: email }
        //     , (err, numberRemoved) => {
        //     if(numberRemoved === 0) next(new Error(`${email} was not found.`));
        //   } 
        )
        res.status(200).json(res)
    }

    catch (err) {
        res.json(err)
    }
})

app.post('/register', async (req, res) => { 
    const { username, email, password } = req.body
    console.log(username, email, password)
    try {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await UserModel.create(
        {    username,
            email,
            password: hash,
        }
        )
        const user = newUser.toObject();
        res.status(201).json({ user })
    } catch (err) {
        console.error("Database Error:", err.message); // Log the database error message
        res.status(500).json(err.message)
    }
}); 

app.post('/login', async (req, res) => { 
    const { email, password } = req.body

    const foundUser = await UserModel.findOne(
        { email }
    )

    try {
        const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password);
        console.log('foundUser', foundUser)
        if (foundUser) {
            const token = jwt.sign({ email: foundUser.email }, privateKey, { expiresIn: '1h' });

            console.log('isPasswordCorrect', isPasswordCorrect)

            if (isPasswordCorrect) {
                res.status(200).json(token)
            } else {
                res.status(401).json("password incorrect")
            }
        } else {
            res.status(404).json("no user found")
        }
    } catch (err) {
        console.error("Database Error:", err.message); // Log the database error message
        res.status(500).json(err.message)
    }
}); 

// app.get('/dashboard', isAuthenticated, (req, res) => { 
//     res.json('Hello authentificated user!')
//     }); 


app.listen(process.env.port || 3001); 
console.log('Running at Port 3001'); 

module.exports = app;
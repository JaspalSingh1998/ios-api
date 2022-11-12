require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()


const url = "mongodb+srv://Goldy:goldy@authentication.y9mdvtp.mongodb.net/?retryWrites=true&w=majority"

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

const PORT = process.env.PORT || 5000;

const authentication = require('./src/routes/authentication');

app.use(express.json())

app.get('/', (req, res) => {
    return res.json({msg: 'You are at right place'})
})

app.use('/api', authentication)


app.listen(PORT, () => console.log(`App is running at port ${PORT}`))
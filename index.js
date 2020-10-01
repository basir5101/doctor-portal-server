const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;


const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


require('dotenv').config()
const port = 5000

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jo990.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// connect database

const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true });
client.connect(err => {
  const appointmentCollection = client.db("Doctor-portal").collection("appointment");
   console.log('database-connected')


   app.post('/appointment', (req, res)=>{
       const appointment = req.body;
       appointmentCollection.insertOne(appointment)
       .then(result =>{
           console.log('success')
       })
   })
   app.post('/facebook', (req, res)=>{
    const appointment = req.body;
    appointmentCollection.insertOne(appointment)
    .then(result =>{
        console.log('success')
    })
})



  
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)
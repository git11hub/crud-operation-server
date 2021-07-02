const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const uri = "mongodb+srv://crudProject:crud1234@cluster0.eftco.mongodb.net/crudProject?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello I am working he he he...')
})

app.listen(5000);


client.connect(err => {
  const userCollection = client.db("crudProject").collection("crudTesting");
    
  app.post("/addUser", (req, res) => {
      
    const user = req.body;
    userCollection.insertOne(user)
    .then(result => {
      console.log(result);
    })
  });
  
  app.get('/users', (req, res) => {
    userCollection.find()
      .toArray((err, items) => {
        res.send(items);
        console.log('from database hoho', items);
      })
  })
});

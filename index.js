const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
 require('dotenv').config();


// midelware.config
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${DB_PASSWORD}@cluster0.qnzupqp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});




 
 
app.get('/', (req, res) => {
 
    res.send('hello from mongo crud server');
})
 
app.listen(port,()=>{
 
    console.log(`Listening on port ${port}`);
})

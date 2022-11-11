const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
 require('dotenv').config();


// midelware.config
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qnzupqp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const serviceCollection = client.db('computer_s').collection('services');
        const reviewCollection = client.db('computer_s').collection('review');


        app.get('/banner_services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.limit(3).toArray();
         
            res.send(services);
        });
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
         
            res.send(services);
        });

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });
       
        app.post('/review',async(req, res) => {

    
            const user = req.body;
           
            const result = await reviewCollection.insertOne(user);
            res.send(result);
              
           
               })



        // // orders api
        // app.get('/orders', async (req, res) => {
        //     let query = {};

        //     if (req.query.email) {
        //         query = {
        //             email: req.query.email
        //         }
        //     }

        //     const cursor = orderCollection.find(query);
        //     const orders = await cursor.toArray();
        //     res.send(orders);
        // });

        // app.post('/orders', async (req, res) => {
        //     const order = req.body;
        //     const result = await orderCollection.insertOne(order);
        //     res.send(result);
        // });

        // app.patch('/orders/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const status = req.body.status
        //     const query = { _id: ObjectId(id) }
        //     const updatedDoc = {
        //         $set:{
        //             status: status
        //         }
        //     }
        //     const result = await orderCollection.updateOne(query, updatedDoc);
        //     res.send(result);
        // })

        // app.delete('/orders/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const result = await orderCollection.deleteOne(query);
        //     res.send(result);
        // })


    }
    finally {

    }

}

run().catch(err => console.error(err));




 
 
app.get('/', (req, res) => {
 
    res.send('hello from mongo crud server');
})
 
app.listen(port,()=>{
 
    console.log(`Listening on port ${port}`);
})

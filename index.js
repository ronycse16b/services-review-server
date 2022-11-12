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
        app.post('/services', async (req, res) => {
            const services = req.body;
            const result = await serviceCollection.insertOne(services);
            res.send(result);
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




        // review api
        app.get('/review', async (req, res) => {
            let query = {};

            if (req.query.reviwer_email) {
                query = {
                    reviwer_email: req.query.reviwer_email
                }
            }

            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        });

        app.get('/review/:id', async (req, res) => {
          

            const id = req.params.id;
            const query = { service_id:id };
            const cursor =  reviewCollection.find(query);
            const service = await cursor.toArray();
            res.send(service);
        });

     
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

        app.delete('/review/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await reviewCollection.deleteOne(query);
            res.send(result);
        })


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

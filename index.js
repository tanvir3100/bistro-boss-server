const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 3100


//middleware
app.use(cors())
app.use(express.json())

const corsOption = [
    origin = 'http://localhost:5173/'
]


// const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASS}@cluster0.huqehxg.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASS}@cluster0.huqehxg.mongodb.net/?retryWrites=true&w=majority`;
// const uri = "mongodb+srv://bistro320:FIxkgGXajashTmnr@cluster0.huqehxg.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const menuCollection = client.db("bistroDb").collection("menu");
        const reviewCollection = client.db("bistroDb").collection("reviews");
        const cartCollection = client.db("bistroDb").collection("carts");



        app.get('/menu', async (req, res) => {
            const result = await menuCollection.find().toArray();
            res.send(result)
        })
        app.get('/reviews', async (req, res) => {
            const result = await reviewCollection.find().toArray();
            res.send(result)
        })

        // carts collection
        app.post('/carts', async (req, res) => {
            const cartItems = req.body;
            const result = await cartCollection.insertOne(cartItems)
            res.send(result);
        })
        app.get('/carts', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const result = await cartCollection.find(query).toArray();
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);















app.get('/', (req, res) => {
    res.send('bistro is running')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})







/**
 * ------------------------------------------
 *             NAMING CONVENTION
 * ------------------------------------------
 * 
 * app.get('/users')
 * app.get('/users/:id')
 * app.post('/users')
 * app.put('/users/:id')
 * app.patch('/users/:id')
 * app.delete('/users/:id')
*/
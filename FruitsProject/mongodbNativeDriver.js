/*
This code snippet shows how to connect our application to mongoDB using the native mongoDB node.js driver.
*/

const MongoClient = require("mongodb").MongoClient;

// Replace the uri string with your mongoDB deployment's connection string
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);
async function run() {

  try {
    await client.connect();
    /*
    In our case, mongoDB server is running locally on our maching, so we test the connection by trying to connect to an
    existing database called shopDB. Inside shopDB we have an existing collection called products. Make sure the mongoDB server
    is running before running this app.js.
    */

    // database name and collection name
    const dbName = "fruitsDB";
    const collectionName = "fruits";

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    //insert some fruits into fruits collection
    collection.insertMany([{
        name: "Apple",
        score: 8,
        review: "Great fruit"
      },
      {
        name: "Orange",
        score: 6,
        review: "Kinda sour"
      },
      {
        name: "Banana",
        score: 9,
        review: "Sweet stuff!"
      }
    ])

    // query for a product that has the id of 1
    const query = {
      name:"Banana"
    };

    const product = await collection.findOne(query);

    console.log(product);
  } finally {

    // ensure that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

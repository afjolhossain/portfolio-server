const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

// middleware:
app.use(cors());
app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hvuwn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// console.log(uri);
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hvuwn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    client.connect();
    const database = client.db("Portfolio");
    const projectsCollection = database.collection("projects");

    // GET API
    app.get("/projects", async (req, res) => {
      const cursor = projectsCollection.find({});
      const explores = await cursor.toArray();
      res.send(explores);
    });

    //  API PlaceOrder Id
    app.get("/projects/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const product = await projectsCollection.findOne(query);
      res.send(product);
    });
  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello,portfolio server is runing");
});

app.listen(port, () => {
  console.log(`server is runing ${port}`);
});

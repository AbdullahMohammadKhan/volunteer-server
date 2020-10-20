
const express = require("express");
const app = express();
const port = 4000;
var bodyParser = require("body-parser");
var cors = require("cors");

const ObjectId = require("mongodb").ObjectId
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://abdullah:abdullah@cluster0.rmegi.mongodb.net/volunteer?retryWrites=true&w=majority";
  //${process.env.DB_USER}
  //${process.env.DB_PASSWORD}
  //${process.env.DB_NAME}
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.get("/", (req, res) => {
  res.send("hello from app it's working working");
});


client.connect((error)=>{
    const registrationCollection=client.db("volunteer").collection("registration");
    console.log("database connection established");

app.post("/registration", (req, res) => {
    const reg = req.body;
    // console.log(reg);
    registrationCollection
      .insertOne(reg)
      .then((result) => {
        //console.log(result);
        res.send(result.insertedCount > 0);
      })
      .catch((err) => console.log(err));
  });


  app.get("/getRegistrationAll", (req, res) => {
    registrationCollection.find({}).toArray((err, documents) => {
      //console.log(documents);
      res.send(documents);
    });
  });



app.delete("/delete/:id", (req, res) => {
      // console.log(req.params.id);
      registrationCollection.deleteOne({_id:ObjectId(req.params.id)}).then(result => {})
  })
app.post("/getRegistrationByMail", (req, res) => {
    //const date = req.body;
    const email = req.body.email;
    //console.log("email:" + email);

    registrationCollection.find({ mail: email }).toArray((err, doc) => {
      //console.log("doc:" + doc);
      res.send(doc);
    });
  });

  


})



app.listen(process.env.PORT || port );
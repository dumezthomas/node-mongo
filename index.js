const MongoClient = require("mongodb").MongoClient;
const dbOper = require("./operations");

const url = "mongodb://localhost:27017/";
const dbName = "conFusion";

MongoClient.connect(url)

  .then((client) => {
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    dbOper
      .insertDocument(db, { name: "Vadonut", description: "Test" }, "dishes")

      .then((result) => {
        console.log("Insert document:\n", result.insertedId);
        return dbOper.findDocuments(db, "dishes");
      })

      .then((docs) => {
        console.log("Found documents:\n", docs);
        return dbOper.updateDocument(db, { name: "Vadonut" }, { description: "Updated Test" }, "dishes");
      })

      .then((result) => {
        console.log("Updated document:\n", result);
        return dbOper.findDocuments(db, "dishes");
      })

      .then((docs) => {
        console.log("Found documents:\n", docs);
        return db.dropCollection("dishes");
      })

      .then((result) => {
        console.log("Dropped collection:", result);
        client.close();
      })

      .catch((err) => console.log(err));
  })

  .catch((err) => console.log(err));

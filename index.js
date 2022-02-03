const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dbOper = require("./operations");

const url = "mongodb://localhost:27017/";
const dbName = "conFusion";

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null);

  console.log("Connected correctly to server");

  const db = client.db(dbName);

  dbOper.insertDocument(db, { name: "Vadonut", description: "Test" }, "dishes", (result) => {
    console.log("Insert document:\n", result.insertedId);

    dbOper.findDocuments(db, "dishes", (docs) => {
      console.log("Found documents:\n", docs);

      dbOper.updateDocument(db, { name: "Vadonut" }, { description: "Updated Test" }, "dishes", (result) => {
        console.log("Updated document:\n", result);

        dbOper.findDocuments(db, "dishes", (docs) => {
          console.log("Found documents:\n", docs);

          db.dropCollection("dishes", (result) => {
            console.log("Dropped collection:\n", result);

            client.close();
          });
        });
      });
    });
  });
});

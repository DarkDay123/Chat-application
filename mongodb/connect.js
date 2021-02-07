const { MongoClient } = require("mongodb");
const uri = `mongodb://${process.env.MONGODB}`;
const client = new MongoClient(uri,{useUnifiedTopology: true});

async function mongoConnect() {
  try {
    await client.connect();
    console.log("Connected to mongoDB");
  } catch (e) {
    console.error(e);
  }
}

mongoConnect();

module.exports = { client : ()=>client }
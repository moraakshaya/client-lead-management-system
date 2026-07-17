const mongoose = require('mongoose');

const uri = "mongodb://moraakshayareddy_db_user:JktPT32vRrEDHQYN@ac-6i7lidh-shard-00-00.1tjslk0.mongodb.net:27017,ac-6i7lidh-shard-00-01.1tjslk0.mongodb.net:27017,ac-6i7lidh-shard-00-02.1tjslk0.mongodb.net:27017/client-lead-management?authSource=admin&replicaSet=atlas-h2k426-shard-0&ssl=true&appName=LeadFlowCluster";

mongoose.connect(uri)
  .then(async () => {
    console.log("Connected to MongoDB!");
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
    process.exit(0);
  })
  .catch(err => {
    console.error("Connection error:", err);
    process.exit(1);
  });

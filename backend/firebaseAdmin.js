// backend/firebaseAdmin.js
const admin = require("firebase-admin");
const serviceAccount = require("./maid-security-e7d05-firebase-adminsdk-4a755-e7ac6f61b8.json"); // Download this file from Firebase console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://maid-security-e7d05-default-rtdb.firebaseio.com/",
});

const db = admin.database();
module.exports = db;

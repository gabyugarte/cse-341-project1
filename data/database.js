const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');

let database;

const initDb = (callback) => {
  if (database) {
    console.log('Database is already initialized!');
    return callback(null, database);
  }

  MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
      database = client.db('Project1'); // 👈 importante: usar .db('nombreBase')
      console.log('✅ MongoDB connected to Project1');
      callback(null, database);
    })
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err);
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) throw Error('Database not initialized');
  return database;
};

module.exports = {
  initDb,
  getDatabase,
};



// const dotenv = require('dotenv');
// dotenv.config();
// const MongoClient = require('mongodb').MongoClient;

// let database;

// const initDb = (callback) => {
//     if (database) {
//         console.log('Database is already initialized!');
//         return callback(null, database);
//     }
//     MongoClient.connect(process.env.MONGODB_URL)
//         .then((client) => {
//             database = client;
//             callback(null, database);
//         })
//         .catch((err) => {
//             callback(err);
//         });
// };

// const getDatabase = () => {
//     if (!database) {
//        throw Error('Database not initialized');
//     }
//     return database;
// }

// module.exports = {
//     initDb,
//     getDatabase,
// };
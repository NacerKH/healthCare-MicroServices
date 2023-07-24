const mongoose = require('mongoose');

const uri = process.env.URL_MONGO_DB;
console.log(uri)

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

module.exports = db;
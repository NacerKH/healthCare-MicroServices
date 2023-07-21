const mongoose = require('mongoose');

const uri = "mongodb://127.0.0.1:27017/complaint";


mongoose.set('strictQuery', true)

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


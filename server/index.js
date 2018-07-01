const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config/config');

let options = {
  //retry to connect for 60 times
  reconnectTries: 60,
  //wait 1 second before retrying
  reconnectInterval: 1000,
  auto_reconnect: true
}
const reconnectTimeout = 5000; // ms.

// conectar el servidor
app.listen(config.port, () => {
  console.log(`API corriendo en http://localhost:${config.port}`)
})

//conectar la Base de Datos
function connect() {
  mongoose.connect(config.db, options)
  .catch((err) => {
    // ya lo manejamos con db.on('error') pero si no ponemos el catch da un warning en la promise
  })
}

const db = mongoose.connection;

db.on('connecting', () => {
  console.info('Connecting to MongoDB...');
});

db.on('connected', () => {
  console.info('Connected to MongoDB!');
});

db.on('error', (error) => {
  console.error(`MongoDB connection error: ${error}`);
  mongoose.disconnect();
});

db.once('open', () => {
  console.info('MongoDB connection opened!');
});

db.on('reconnected', () => {
  console.info('MongoDB reconnected!');
});

db.on('disconnected', () => {
  console.error(`MongoDB can't connect or disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`);
  setTimeout(() => connect(), reconnectTimeout);
});

connect();

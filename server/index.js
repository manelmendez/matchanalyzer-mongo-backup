const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config/config');

mongoose.connect(config.db, (err, res) => {
  if (err) {
    return console.log(`Error al conectar con la base de datos: ${err}`)
  }
  console.log('Conectado a la base de datos')
  
  app.listen(config.port, () => {
    console.log(`API corriendo en http://localhost:${config.port}`)
  })
})
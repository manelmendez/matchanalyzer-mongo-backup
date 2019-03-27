module.exports = {
  port: process.env.PORT || 9000,
  db: process.env.MONGODB_URI || 'mongodb://localhost:27017/matchAnalyzer',
  SECRET_TOKEN: 'claveincreiblementecomplicada'
}
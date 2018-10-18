const config = process.env.NODE_ENV
  ? require(`./${process.env.NODE_ENV}`)
  : require('./dev');

module.exports = config;

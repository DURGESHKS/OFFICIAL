const { reconDB } = require("reconlx");
const mongodb = process.env.MONGOURL;
const db = new reconDB({
  uri: mongodb,
});

module.exports = db;
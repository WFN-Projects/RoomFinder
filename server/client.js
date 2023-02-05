var pg = require('pg');
require('dotenv').config();
var db_connection_stirng = process.env.DATABASE_URL;
var client = new pg.Client(db_connection_stirng);

(async () => {
    await client.connect();
  })();

module.exports = client;
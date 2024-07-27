/**
 * 환경변수 .env 파일 읽어들이기
 *  npm i dotenv
 */
require('dotenv').config();

/**
 * 데이터베이스 관련
 * npm install knex --save
 * npm install mysql2 --save
 */
var db = require('knex')({
  client: 'mysql2',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : process.env.DB_PASSWORD,
    database : 'vue_board'
  }
});

const ret = db.raw('select now()')
.then((item) => {console.log(item[0])})

module.exports = db;
const mysql= require('mysql2');
const connectionPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'provinsi',
});
mysql.createConnection({multipleStatements: true});
module.exports = connectionPool;
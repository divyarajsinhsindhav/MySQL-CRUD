const mysql = require('mysql2')

const mySqlConnection = mysql.createConnection({
   host: 'localhost',
   user: USERNAME,
   password: PASSWORD,
   database: DB_NAME,
   port: PORT
});

const connection = mySqlConnection.connect((err) => {
    if(err) {
        console.error('Error', err)
    } else {
        console.log('Connection successful')
    }
})

module.exports = mySqlConnection;

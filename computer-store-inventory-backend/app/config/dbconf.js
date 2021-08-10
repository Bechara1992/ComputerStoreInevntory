const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SomeVeryStrongPass1',
    database: 'computer_store'
  });
  connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL serverrr.');
  });

module.exports = connection
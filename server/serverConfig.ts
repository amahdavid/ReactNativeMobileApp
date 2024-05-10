import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ReactMobileAppProject',
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Connected to the MySQL server');
});
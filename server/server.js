const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "ReactMobileAppProject",
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
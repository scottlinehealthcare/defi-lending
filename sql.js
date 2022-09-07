require('dotenv').config({ path:'./secret.env' });
const solend_data_bank = require('./solend');
const tulip_data_bank = require('./tulip');
const francium_data_bank = require('./francium');

//msql2 is faster and more secure than 1
const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

// test code
const solend_sol = {
    name : 'sol',
    lending_protocol : 'solend',
}



function load_data() {

    let sol = solend_data_bank[0];
    let usdc = solend_data_bank[1];
    let usdt = solend_data_bank[2];


    connection.connect(err => {
        if (err) throw err;
        console.log('Database ' + `${process.env.database}` + ' connected.')
        connection.query({
            sql : 'INSERT INTO test1 (name, lending_protocol, price) VALUES (?, ?, ?)',
            values : [
                sol.name, 
                sol.lending_protocol, 
                sol.price
            ][
                usdc.name, 
                usdc.lending_protocol, 
                usdc.price
            ][
                usdt.name,
                usdt.lending_protocol,
                usdt.price
            ]
        }, (err, res) => {
                if (err) throw err;
                console.log(res);
                console.log('Solend data inserted!') 
        });
    });
};

load_data();

module.exports = this.load_data;
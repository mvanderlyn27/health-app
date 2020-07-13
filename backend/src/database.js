const { Sequelize } = require('sequelize');
const db = new Sequelize('postgres://'+process.env.DB_USER+':'+process.env.DB_PASS+'@postgres:'+process.env.DB_PORT+'/'+process.env.DB_NAME, {logging: console.log}); 
console.log('postgres://'+process.env.DB_USER+':'+process.env.DB_PASS+'@postgres:'+process.env.DB_PORT+'/'+process.env.DB_NAME);
let test_connection = async function(){
    try {
        await db.authenticate();
        //await db.sync();
        console.log('Connection has been established successfully.');
        //creates any new tables if not seen before
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = {db, test_connection};
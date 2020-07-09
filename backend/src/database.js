const { Sequelize } = require('sequelize');
const db = new Sequelize('postgres://'+process.env.DB_USER+':'+process.env.DB_PASS+'@postgres:'+process.env.DB_PORT+'/'+process.env.DB_NAME) // Example for postgres
const test_connection = async function(){
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
        //creates any new tables if not seen before
        db.sync(); 
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
export default {test_connect, db };

// sequelizeConfig.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();
const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASS,
    {
        dialect: 'mysql',
        port: parseInt(process.env.MYSQL_PORT)
    }
);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();
export default sequelize;

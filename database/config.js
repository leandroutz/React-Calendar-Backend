const mongoose = require('mongoose');
require('dotenv').config()


const dbConnection = async() => {
    try {
        console.log(process.env.DB_CNN);
        
        await mongoose.connect(process.env.DB_CNN);     
        console.log('DB is ON, bitches!!!');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de incializar DB')
    }
} 


module.exports = {
    dbConnection
}
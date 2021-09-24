import mongoose from 'mongoose';
import config from './config';

async function connectDatabase() {
    try {
        await mongoose.connect(config.mongoUri);
        console.log('Database connect succesfully !!')
    } catch (error) {
        console.log(`Error happened as connecting to database \n ${error} `)
        process.exit();
    }
}

export default connectDatabase;
import mongoose from 'mongoose';

async function connect() {
    try {
        const dbConnection = mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to database');
    } catch (error) {
        console.log(error);
    }
}

export default connect;

const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = process.env;

exports.connect = () => {
    mongoose
        .connect(MONGO_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('Successfully connected to database')
        })
        .catch((e) => {
            console.log('Database connection failed. exiting now...');
            console.error(e);
            process.exit(1);
        })
}
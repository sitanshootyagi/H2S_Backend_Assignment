
const mongoose = require('mongoose');

const mongoDbConnect = async () => {
    try {
        await mongoose.connect(process.env.databaseURL)
        console.log("Database Connected")

    }
    catch (err) {
        console.error('Failed to connect to mongo on startup - retrying in 5 sec \n');
        setTimeout(mongoDbConnect, 5000);
    }

};
module.exports = mongoDbConnect

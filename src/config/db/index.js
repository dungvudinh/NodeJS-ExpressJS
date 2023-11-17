const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/course_db');
        console.log('Database is connected');
    } catch (error) {
        console.log(`Fail to connect to database. Detail ${error}`);
    }
}

module.exports = { connect };

const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Tour = require('./../../models/toursModel');
const { argv } = require('process');

const db = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("Database connected");
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data Loaded Successfully');
    } catch (err) {
        console.log(err)
    }
}

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data deleted Successfully');
    } catch (err) {
        console.log(err)
    }
}

if (process.argv[2] == '--import') {
    importData();
} else if (process.argv[2] == '--delete') {
    deleteData();
}
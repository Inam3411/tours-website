const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const { doc } = require('prettier');

dotenv.config({ path: './config.env' });

const db = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("Database connected");
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Express app is running at ${port}`);
})

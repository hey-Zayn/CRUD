const express  = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connection = require('./Database/connection');





const port = process.env.PORT;
const app = express();


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173' ,
    credentials: true,
}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use((error, req, res, next) => {
    const message = error.message || 'Something went wrong';
    const status = error.status || 500;
    res.status(status).json({
        success: false,
        message,
    });
});
app.use('/api/user', require('./Router/user.router'));

app.get('/', (req, res) => {
    res.send('API is running...');
});


app.listen(port, () => {
    connection();
    console.log(`Server is running on port ${port}`);
});

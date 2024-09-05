require('dotenv').config(); // Load .env file
const express = require('express');
const Routes = require('./routes'); // Import branch routes
var cors = require('cors')


const app = express();
const port = 3001;
app.use('*',cors())
app.use(express.json()); //for raw data
app.use(express.urlencoded({ extended: true }));
app.use(Routes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

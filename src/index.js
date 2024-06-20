const express = require('express');
const publicRouter = require('./routes/public-api.js');
const userRouter = require('./routes/api.js');

require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT
app.use(publicRouter);
app.use(userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

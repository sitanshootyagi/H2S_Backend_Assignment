const express = require('express');
const app = express();
const mongoDbConnect = require("./dbConnection.js")
require('dotenv').config()
const router = require('./routes/user.js')

const PORT = process.env.PORT;
mongoDbConnect();

app.use(express.raw({ limit: '100mb' }));
app.use(express.json({ limit: '100mb', parameterLimit: 100000 }));
app.use(express.urlencoded({ extended: true, limit: '100mb', parameterLimit: 100000 }));

async function startServer() {
    app.use(router);
    app.use((req, res, next) => {
        res.send('Welcome To Auth Service');
    });
    app.listen(PORT, async () => {
        console.log(`Listening on port ${PORT}`, 'info');
        return Promise.resolve();
    });
    return app;
}
startServer()
import express from 'express';
import routers from './routers/index.js';
import bodyParser from 'body-parser';
import db from './models/index.js';
import dbconfig from './config/db.config.js';

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

db.mongoose
    .connect(dbconfig.link , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Successfully connect to MongoDB.');
    })
    .catch(err => {
        console.error('Connection error', err);
        ProcessingInstruction.exit();
    });

app.use('/', routers);

app.listen(5000, () => {
    console.log('App started on port 5000');
});

export default app; 
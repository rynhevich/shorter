import express from 'express';
import routers from './routers/index.js';
import path from 'path';
import bodyParser from 'body-parser';
//import cors from 'cors';
import db from './models/index.js';
import dbconfig from './config/db.config.js';



const app = express();

//var corsOptions = {
//    origin: 'http://localhost:8081'
//};

//app.use(cors(corsOptions));

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
    console.log("App started on port 5000");
});

//export default app; 
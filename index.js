//Load process.env file
require('dotenv').config();

const express       = require('express');
const app           = express();
const cors          = require('cors');
const bodyParser    = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/client`));

app.listen(process.env.PORT, (err)=>{
    err ? console.log(err) : console.log(`Server running on port ${process.env.PORT}`)
})

require('./mongodb/connect');
require('./routes/router')(app);

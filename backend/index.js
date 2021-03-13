const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var { mongoose } = require('./db');
var studentController = require('./controllers/studentController');

var app = express();

app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));

app.listen(3000, () => {console.log('Server started on port 3000');});

app.use('/students', studentController);
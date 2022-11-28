const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db/config').connect();


const app = express();
const port = process.env.API_PORT || 3000;

app.use(cors())
app.use(express.json())

app.use('/api/', require('./routes'))

app.all('*', (req, res) => res.status(404).json('Unknown url requested'))

app.listen(port, () => console.log(`Server started on ${port}`))
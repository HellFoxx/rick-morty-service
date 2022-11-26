const express = require('express');
require('dotenv').config();
require('./db/config').connect();

const app = express();
const port = process.env.API_PORT || 3000;

app.use(express.json())

app.use('/api/', require('./routes'))

app.get('*', (req, res) => res.status(404).json('Unknown url requested'))
app.post('*', (req, res) => res.status(404).json('Unknown url requested'))

app.listen(port, () => console.log(`Server started on ${port}`))
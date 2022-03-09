const express = require('express')

import './src/database'

const app = express();

app.use(express.json());

app.listen(3333, () => {
    console.log('Servidor rodando')
});

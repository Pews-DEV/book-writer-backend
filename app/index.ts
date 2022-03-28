import express = require('express');
import routers from './routers';

import './src/database'

const app = express();

app.use(express.json());
app.use(routers)

app.listen(3333, () => {
    console.log('Servidor rodando')
});

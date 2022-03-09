const express = require('express')

import  './database'

const app = express();

app.use(express.json());

app.listen(3333, ()=>{
    console.log('Servidor rodando')
});

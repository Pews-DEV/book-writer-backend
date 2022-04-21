import express = require('express');

import errorHandle from './src/errorConfig';
import routers from './routers';
import './src/database'

const app = express();

app.use(express.json());
app.use(routers)
app.use(errorHandle)

app.listen(3333, () => {
    console.log('Running on host: http://localhost:3333')
});

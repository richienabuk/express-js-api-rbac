import express from 'express';
import route from './src/routes'

const app = express();

route(app);

const port = 5000;

app.listen(port, () => {
    console.log('App is now running at port ', port)
})

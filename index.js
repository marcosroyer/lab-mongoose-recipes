import express from 'express';
import * as dotenv from 'dotenv';
import connect from './config/db.config.js';
import recipeRoute from './routes/recipe.routes.js';

dotenv.config();

const app = express();

app.use(express.json());

connect();

app.use('/recipes', recipeRoute);

app.listen(process.env.PORT, () => {
    console.log(
        `App up and running on port http://127.0.1.1:${process.env.PORT}`
    );
});

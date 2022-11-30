import express from 'express';
import RecipeModel from '../models/Recipe.model.js';

const recipeRoute = express.Router();

recipeRoute.post('/create', async (request, response) => {
    try {
        const form = request.body;
        const recipe = await RecipeModel.create(form);

        return response.status(201).json(recipe);
    } catch (error) {
        console.log(error.error);
        return response.status(500).json({ msg: 'Algo deu errado.' });
    }
});

recipeRoute.post('/create-many', async (request, response) => {
    try {
        const form = request.body;
        const recipes = await RecipeModel.insertMany(form);

        return response.status(201).json(recipes);
    } catch (error) {
        console.log(error.error);
        return response.status(500).json({ msg: 'Algo deu errado.' });
    }
});

recipeRoute.get('/all-recipes', async (request, response) => {
    try {
        const recipes = await RecipeModel.find({});

        return response.status(200).json(recipes);
    } catch (error) {
        console.log(error.error);
        return response.status(500).json({ msg: 'Algo deu errado.' });
    }
});

recipeRoute.get('/oneRecipe/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const recipe = await RecipeModel.findById(id);

        return response.status(200).json(recipe);
    } catch (error) {
        console.log(error.error);
        return response.status(500).json({ msg: 'Algo deu errado.' });
    }
});

recipeRoute.put('/edit/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const recipe = await RecipeModel.findByIdAndUpdate(
            id,
            { ...request.body },
            { new: true, runValidators: true }
        );

        return response.status(200).json(recipe);
    } catch (error) {
        console.log(error.error);
        return response.status(500).json({ msg: 'Algo deu errado.' });
    }
});

recipeRoute.delete('/delete/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const recipe = await RecipeModel.findByIdAndDelete(id);

        return response.status(200).json(recipe);
    } catch (error) {
        console.log(error.error);
        return response.status(500).json({ msg: 'Algo deu errado.' });
    }
});

export default recipeRoute;

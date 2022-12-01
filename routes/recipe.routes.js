import express from 'express';
import RecipeModel from '../models/Recipe.model.js';
import UserModel from '../models/User.model.js';

const recipeRoute = express.Router();

recipeRoute.post('/create/:idUser', async (request, response) => {
    try {
        const { idUser } = request.params;
        console.log('na rota');
        console.log(idUser);
        const newRecipe = await RecipeModel.create({
            ...request.body,
            creator: idUser,
        });
        const userUpdated = await UserModel.findByIdAndUpdate(
            idUser,
            {
                $push: {
                    recipes: newRecipe._id,
                },
            },
            { new: true, runValidators: true }
        );

        return response.status(201).json(newRecipe);
    } catch (error) {
        console.log(error.errors);
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
        const recipes = await RecipeModel.find({}).populate('creator');

        return response.status(200).json(recipes);
    } catch (error) {
        console.log(error.error);
        return response.status(500).json({ msg: 'Algo deu errado.' });
    }
});

recipeRoute.get('/oneRecipe/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const recipe = await RecipeModel.findById(id).populate('creator');

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

recipeRoute.delete('/delete/:recipeId', async (request, response) => {
    try {
        const { recipeId } = request.params;
        const deletedRecipe = await RecipeModel.findByIdAndDelete(recipeId);
        const userUpdated = await UserModel.findByIdAndUpdate(
            deletedRecipe.creator,
            { $pull: { recipes: recipeId } },
            { new: true, runValidators: true }
        );

        return response.status(204).json();
    } catch (error) {
        console.log(error.error);
        return response.status(500).json({ msg: 'Algo deu errado.' });
    }
});

export default recipeRoute;

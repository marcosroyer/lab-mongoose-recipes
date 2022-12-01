import express from 'express';
import UserModel from '../models/User.model.js';
import RecipeModel from '../models/Recipe.model.js';

const userRoute = express.Router();

userRoute.post('/create', async (request, response) => {
    try {
        const form = request.body;

        const newUser = await UserModel.create(form);

        return response.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        return response.status(400).json(error.errors);
    }
});

userRoute.get('/read/:userId', async (request, response) => {
    try {
        const { userId } = request.params;

        const user = await UserModel.findById(userId).populate('recipes');

        return response.status(201).json(user);
    } catch (error) {
        console.log(error);
        return response.status(400).json(error.errors);
    }
});

userRoute.put('/update/:userId', async (request, response) => {
    try {
        const { userId } = request.params;

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { ...request.body },
            { new: true, runValidators: true }
        );

        return response.status(201).json(updatedUser);
    } catch (error) {
        console.log(error);
        return response.status(400).json(error.errors);
    }
});

userRoute.delete('/delete/:userId', async (request, response) => {
    try {
        const { userId } = request.params;

        const deleteddUser = await UserModel.findByIdAndDelete(userId);
        await RecipeModel.deleteMany({ userId });

        return response.status(204).json();
    } catch (error) {
        console.log(error);
        return response.status(400).json(error.errors);
    }
});

export default userRoute;

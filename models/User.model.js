import { Schema, model } from 'mongoose';
import RecipeModel from '../models/Recipe.model.js';

const userSchema = Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        bio: {
            type: String,
        },
        age: {
            type: Number,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        isChef: {
            type: Boolean,
            default: false,
        },
        recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
    },
    { timestamps: true }
);

const UserModel = model('User', userSchema);

export default UserModel;

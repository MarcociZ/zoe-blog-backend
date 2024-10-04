import { body } from "express-validator";

export const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({min: 5})
];

export const registerValidation = [
    body('email').isEmail(),
    body('password').isLength({min: 5}),
    body('fullName').isLength({min: 3}),
    body('avatarUrl').optional().isString(),
];


export const postCreateValidation = [
    body('title', "Please insert title").isLength({min: 3}).isString(),
    body('text', "Please insert text").isLength({min: 10}).isString(),
    body('tags', "The format is incorrect").optional().isString(),
    body('imageUrl', "image link doesn't work").optional().isString(),
];
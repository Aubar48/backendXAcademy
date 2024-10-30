// src/validations/playerValidations.js

const { body } = require('express-validator');

exports.createPlayerValidation = [
    body('overall')
        .notEmpty().withMessage('Overall is required')
        .isInt({ min: 0, max: 99 }).withMessage('Overall must be an integer between 0 and 99'),
    body('age')
        .notEmpty().withMessage('Age is required')
        .isInt({ min: 15 }).withMessage('Age must be at least 15'),
    body('fifa_version')
        .notEmpty().withMessage('FIFA Version is required')
        .isString().withMessage('FIFA Version must be a string'),
    body('player_face_url')
        .isURL().withMessage('Player face URL must be a valid URL'),
    body('long_name')
        .notEmpty().withMessage('Long Name is required')
        .isString().withMessage('Long Name must be a string'),
    body('player_positions')
        .notEmpty().withMessage('Player Positions is required'),
    body('fifa_update')
        .notEmpty().withMessage('Fifa Update is required'),
    body('potential')
        .optional()
        .isInt({ min: 0, max: 99 }).withMessage('Potential must be an integer between 0 and 99')
];


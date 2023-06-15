const { body,check ,validationResult } = require('express-validator');
const GENDER = ["Male", "female", "Other"];
const validate = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({ errors: errors.array() });
    };
};

exports.AddUserValidation = validate([body('email').isEmail().normalizeEmail(),
    body('gender').notEmpty().isIn(GENDER).withMessage('gender must be Male Or female or Other' )
    ])


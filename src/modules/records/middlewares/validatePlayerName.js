// import { validationErrors } from "./validationErrors";
import { body, validationResult } from "express-validator";
const emptyError = "must not be empty.";
const maxLengthError = (max) => `'s length must not exceed ${max} characters.`;
const intRangeError = (min, max) =>
  `must be an integer between ${min} and ${max}.`;
const leadingZeroesError = "must not have any leading zero.";

const record = [
  body("name")
    .notEmpty()
    .withMessage(`Player name ${emptyError}`)
    .trim()
    .escape()
    .isLength({ max: 30 })
    .withMessage(`Player name ${maxLengthError(30)}`),
  body("durationMs")
    .notEmpty()
    .withMessage(`Duration ${emptyError}`)
    .isInt({ min: 0, max: 90000000 })
    .withMessage(`Duration ${intRangeError(0, 90000000)}`)
    .isInt({ allow_leading_zeroes: false })
    .withMessage(`Duration ${leadingZeroesError}`),
];

export const validateRecord = [
  record,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

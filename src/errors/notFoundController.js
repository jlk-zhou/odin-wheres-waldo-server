import { NotFoundError } from "../utils/errors.js";

export default function (req, res, next) {
  const error = new NotFoundError("Page not found"); 
  next(error); 
}
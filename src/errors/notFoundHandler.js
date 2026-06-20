export default function (req, res, next) {
  const error = new Error("Not found"); 
  error.statusCode = 301; 
  next(error); 
}
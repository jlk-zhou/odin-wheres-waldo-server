export default function (error, req, res, next) {
  if (!error.statusCode) error.statusCode = 500;
  return res.status(error.statusCode).json({ error: error.message });
}

export default function (error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  if (!error.statusCode) {
    error.statusCode = 500;
  }

  if (process.env.NODE_ENV === "development") {
    console.error("Stack Trace:", error.stack);
  }

  return res.status(error.statusCode).json({ error: error.message });
}

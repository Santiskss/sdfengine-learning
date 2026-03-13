/**
 * Express error-handling middleware. Maps error messages to HTTP status codes:
 * - 404 for messages containing 'not found'
 * - 400 for messages containing 'Invalid' or 'must have'
 * - 500 for everything else (hides details outside development)
 *
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function errorHandlerMiddleware(err, req, res, next) {
  const isDev = process.env.NODE_ENV === 'development';

  console.error(`[${new Date().toISOString()}] ${err.message}`);

  if (err.message?.includes('not found')) {
    return res.status(404).json({
      success: false,
      error: { message: err.message },
    });
  }

  if (err.message?.includes('Invalid') || err.message?.includes('must have')) {
    return res.status(400).json({
      success: false,
      error: { message: err.message },
    });
  }

  res.status(500).json({
    success: false,
    error: {
      message: isDev ? err.message : 'Internal server error',
    },
  });
}

module.exports = errorHandlerMiddleware;

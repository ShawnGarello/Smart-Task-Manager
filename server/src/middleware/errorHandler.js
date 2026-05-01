export function errorHandler(err, _req, res, _next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'Invalid JSON body'
    });
  }

  console.error(err);

  return res.status(500).json({
    error: 'Internal server error'
  });
}

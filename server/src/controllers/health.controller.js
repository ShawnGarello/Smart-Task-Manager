export function getHealth(_req, res) {
  res.json({
    status: 'ok',
    service: 'smart-task-manager-api'
  });
}
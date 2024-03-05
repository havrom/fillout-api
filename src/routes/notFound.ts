import { Router, json } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.status(404).json({
    statusCode: 404,
    error: 'Not Found',
    message: 'Requested resource not found',
  });
});

export default router;

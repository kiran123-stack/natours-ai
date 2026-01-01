import express from 'express';
import { getDestinationInfo,getTourPlan } from '../controllers/aiController';

const router = express.Router();

router.post('/info', getDestinationInfo);
router.post('/plan', getTourPlan);

export default router;
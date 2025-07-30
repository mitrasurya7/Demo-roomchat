import { Router } from 'express';
import { home } from '../controllers/home.controller';
import { getMessages } from '../controllers/message.controller';

const router = Router();

router.get('/', home);
router.get('/messages', getMessages )

export default router;

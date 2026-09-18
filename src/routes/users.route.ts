import {Router} from 'express';
import {getUsers} from '../controllers/users.controller.js';
import {getUserById} from '../controllers/users.controller.js';
import {createUser} from '../controllers/users.controller.js';

const router = Router();

router.get('/users', getUsers); 
router.get('/users/:id', getUserById); 
router.post('/users', createUser); 

export default router;
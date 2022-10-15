import {Router} from 'express'
import {validator} from '../middlewares/validate'
import {createUser} from '../controller/user.controller'
import { userValidation } from '../model/user.model';
import { login } from '../controller/login';
const router:Router =Router();

router.route('/').post(validator(userValidation,'post'),createUser)
router.route('/login').post(login)

export default router;


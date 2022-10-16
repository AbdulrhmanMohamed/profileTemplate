import { Router } from 'express'
import { validator } from '../middlewares/validate'
import { createUser, updateUser } from '../controller/user/user.controller'
import { userValidation } from '../model/user.model';
import { login } from '../controller/user/login';
import { AuthenticationMiddleWare } from '../middlewares/auth';
import { checkUserPrivelage } from '../middlewares/authorization';
const router: Router = Router();

router.route('/')
    .all(AuthenticationMiddleWare, checkUserPrivelage('user'))
    .post(createUser)
router.route('/login').post(login)
router.route('/:id').all(AuthenticationMiddleWare)
    .put(updateUser)

export default router;


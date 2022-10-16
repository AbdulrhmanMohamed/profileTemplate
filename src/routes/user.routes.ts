import { Router } from 'express'
import { validator } from '../middlewares/validate'
import { changeRole, createUser, updateUser } from '../controller/user/user.controller'
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
router.route('/changeRole/:id').all(AuthenticationMiddleWare,checkUserPrivelage('changeRole'))
.put(changeRole)
export default router;


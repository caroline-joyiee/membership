import { Router } from "express";

import { getAllUsers, getUser, login, logout, signUp } from "../controllers/user-controller.js";
import { checkUserAuth } from "../middleware/auth.js";
// import { upload } from "../middleware/uploads.js";
// import { checkUserAuth } from "../middleware/auth.js";


const userRouter = Router();

userRouter.post('/user/auth/signUp', signUp);

userRouter.get('/user/auth/signUp', getUser);

userRouter.get('/user/auth/:userName', getAllUsers);

userRouter.post('/user/auth/login', login);

userRouter.post('/user/auth/logout', checkUserAuth, logout);


export default userRouter;
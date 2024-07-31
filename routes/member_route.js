import { Router } from "express";
import multer from "multer";
import { deleteMember, getAllMember, postMember, updateUserProfile } from "../controllers/member-controller.js";
import { checkUserAuth } from "../middleware/auth.js";
import { upload } from "../middleware/uploads.js";

// const upload = multer({ dest: 'uploads/' });

export const memberRouter = Router();

memberRouter.post('/user/member', upload.single('image'), checkUserAuth, postMember);

memberRouter.get('/user/member', checkUserAuth, getAllMember);

memberRouter.patch('/user/member/:id',
    upload.fields([
        { name: "image", maxCount: 1 },
    ]),
    checkUserAuth,

    updateUserProfile);


memberRouter.delete('/user/member/:id',
    upload.fields([
        { name: "image", maxCount: 1 },

    ]),


    checkUserAuth,

    deleteMember)



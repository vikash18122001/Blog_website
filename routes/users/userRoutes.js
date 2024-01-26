const express = require('express');
const authMiddleware = require('../../middlewares/auth/authMiddleware');
const {photoUpload,
  profilePhotoResize,} = require('../../middlewares/uploads/fileUpload');
const {
    userRegisterCtrl,
    userLoginCtrl,
    fetchUsers,
    deleteUser,
    fetchUser,
    userProfileCtrl, 
    updateProfile,
    updatePasswordCtrl,
    followUserCtrl,
    unfollowUserCtrl,
    userBlockCtrl,
    userUnblockCtrl,
    profilePhotoUploadCtrl
} = require('../../controllers/user/userCtrl');

const userRouter = express.Router();

// Authentication-related routes
userRouter.post('/register', userRegisterCtrl);
userRouter.post('/login', userLoginCtrl);

// User-related routes with authentication middleware
userRouter.use(authMiddleware);

userRouter.put('/follow', followUserCtrl);
userRouter.put('/unfollow', unfollowUserCtrl);
userRouter.put('/block-user/:id', userBlockCtrl);
userRouter.put('/unblock-user/:id', userUnblockCtrl);
userRouter.put(
    "/upload",
    authMiddleware,
    photoUpload.single("image"),
    profilePhotoResize,
    profilePhotoUploadCtrl
  );
userRouter.get('/', fetchUsers);
userRouter.get('/:id', fetchUser);
userRouter.put('/:id', updateProfile);
userRouter.get('/profile/:id', userProfileCtrl);
userRouter.put('/password/:id', updatePasswordCtrl);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;

const express = require('express');
const authMiddleware = require('../../middlewares/auth/authMiddleware');
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
    unfollowUserCtrl
} = require('../../controllers/user/userCtrl');

const userRouter = express.Router();

userRouter.post("/register", userRegisterCtrl);
userRouter.post('/login', userLoginCtrl);

//authMiddleware before the route handler that requires authentication
userRouter.put('/follow', authMiddleware,followUserCtrl);
userRouter.put('/unfollow',authMiddleware,unfollowUserCtrl)
userRouter.get('/', authMiddleware, fetchUsers);
userRouter.get('/:id', fetchUser);
userRouter.put('/:id',authMiddleware,updateProfile)
userRouter.get('/profile/:id', authMiddleware, userProfileCtrl);
userRouter.put('/password/:id',authMiddleware,updatePasswordCtrl)

userRouter.delete('/:id', deleteUser);

module.exports = userRouter;

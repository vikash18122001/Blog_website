const User=require('../../models/user/user');
const expressAsyncHandler=require('express-async-handler')
const generateToken=require('../../config/jwt/generateToken');
const validateId = require('../../utils/validateMongodbId/validateId');
const userRegisterCtrl=expressAsyncHandler(async(req,res)=>{
    const userExist=await User.findOne({email:req.body.email});
        if(userExist)throw new Error('User already exists');
    try {
        const user= await User.create(
            {
                FirstName:req?.body?.firstName,
                LastName:req?.body?.lastName,
                email:req?.body?.email,
                password:req?.body?.password
               
            }
        )
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});
// login controller
const userLoginCtrl=expressAsyncHandler(async(req,res)=>{
    const user=await User.findOne({email:req.body.email});
    if(user  && (await user.isPasswordMatch(req.body.password))){
        res.json({
            firstName:user.FirstName,
            email:user.email,
            profilePicture:user.profilePhoto,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }
    else {
        res.status(401);
        throw new Error('Invalid User Credentials')
    }
})
/// fetch all users
const fetchUsers=expressAsyncHandler(async(req,res)=>{
    try {
        const users=await User.find({});
        res.json(users);
    } catch (error) {
        res.json(error)
    }

})

// delete a user
const deleteUser=expressAsyncHandler(async(req,res)=>{
    const {id}=req.params;
    // validateId
    validateId(id);
    try {
        const deletedUser=await findByIdAndDelete(id)
        res.json(deletedUser)
    } catch (error) {
        res.json(error)
    }
})
// fetch a single user
const fetchUser=expressAsyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateId(id);
    try {
        const user=await User.findById(id);
        res.json(user);
    } catch (error) {
        res.json(error);
    }
})

// user profile
const userProfileCtrl=expressAsyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateId(id);
    try {
        const profile=await User.findById(id);
        res.json(profile)
    } catch (error) {
        res.json(error)
    }
})
// update Profile

const updateProfile=expressAsyncHandler(async(req,res)=>{
    const {_id}=req.params;
    validateId(_id);
    const user=await User.findByIdAndUpdate(_id,{
        FirstName:req?.body?.firstName,
        LastName:req?.body?.lastName,
        email:req?.body?.email,
        bio:req?.body?.bio
    },{
        new :true,
        runValidators:true
    })
    res.json(user);
})
// update password
const updatePasswordCtrl=expressAsyncHandler(async(req,res)=>{
    const {_id}=req.params;
    const {password}=req.body;
    validatedId(_id);
    if(password){
        const user=await User.findById(_id);
        user.password=password;
        const updatedUser=await user.save();
        res.json(updatedUser);
    }
    res.json(user) ;
})
/// following
const followUserCtrl=expressAsyncHandler(async(req,res)=>{
    
    const {followId}=req.body;
    const loginUserId=req.user.id;
    // if login user is already following
    const target=await User.findById(followId);
    if(target.followers.includes(loginUserId)){
        throw new Error("you already following this user")
    }
    
    await User.findByIdAndUpdate(followId,{
       $push:{followers:loginUserId},
       isFollowing:true
    },{
        new:true
    })
    await User.findByIdAndUpdate(loginUserId,{
        $push:{following:followId}
    },{
        new:true
    })
    res.json("you have successfully followed this user")
})
// unfollow a user
const unfollowUserCtrl=expressAsyncHandler(async(req,res)=>{
    const {unfollowId}=req.body;
    const loginUserId=req.user.id;
    await User.findByIdAndUpdate(unfollowId,{
        $pull:{followers:loginUserId},
        isFollowing:false
    },{new:true})
    await user.findByIdAndUpdate(loginUserId,{
       $pull:{following:unfollowId} 
    },{new:true})
    res.json("you have successfully unfollowed this user")
})
//---------
//Block a user

//---------------
const userBlockCtrl=expressAsyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateId(id);
    const blockUser=await User.findByIdAndUpdate(id,{
        isBlocked:true
    },{new:true})
    res.json(blockUser)
})

//-----------------
// unblock user
//-----------------
const userUnblockCtrl=expressAsyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateId(id);
    const blockUser=await User.findByIdAndUpdate(id,{
        isBlocked:false
    },{new:true})
    res.json(blockUser)
})
/// ----------
//  profilePhotoUploadCtrl
//----------------------
const profilePhotoUploadCtrl=expressAsyncHandler(async(req,res)=>{
    console.log(req.file);
    res.json("upload")
})
module.exports={userRegisterCtrl,
    userLoginCtrl,
    fetchUsers,
    fetchUser,
    deleteUser,
    userProfileCtrl,
    updateProfile,
    updatePasswordCtrl,
    followUserCtrl,
    unfollowUserCtrl,
    userBlockCtrl,
    userUnblockCtrl,
    profilePhotoUploadCtrl
};
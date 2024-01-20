const mongoose = require("mongoose");
const bcrypt=require('bcrypt')

const userSchema = mongoose.Schema(
  {
    FirstName: {
      required: [true, "FirstName is required"],
      type: String,
    },
    LastName: {
      required: [true, "LastName is required"],
      type: String,
    },
    profilePhoto: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    email: {
      required: [true, "Email is required"],
      type: String,
    },
    password: {
      required: [true, "Password is required"],
      type: String,
    },
    bio: {
      type: String,
    },
    postCont: {
      type: Number,
      default: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Blogger", "Guest"],
    },
    isFollowing: {
      type: Boolean,
      default: false,
    },
    isUnFollowing: {
      type: Boolean,
      default: false,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    AccountVerifiedToken: String,
    AccountVerifiedTokenExpires: Date,
    viewedBy: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          refs: "User",
        },
      ],
    },
    followers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          refs: "User",
        },
      ],
    },
    following: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          refs: "User",
        },
      ],
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },

    toObject: {
      virtuals: true,
    },
    timeStamps: true,
  }
);

 userSchema.pre('save',async function(next){
  if(!this.isModified("password")){
    next();
  }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
 })

 userSchema.methods.isPasswordMatch=async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
 }

const User=mongoose.model('User',userSchema);
module.exports=User;

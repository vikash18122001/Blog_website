const express=require("express");
const app=express();
app.use(express.json());
const dbConnect=require("./config/db/dbConnect");
const userRouter=require("./routes/users/userRoutes")
const postRoute=require("./routes/posts/postRoutes")
const CommentRoutes=require('./routes/comments/commentRoute')
const categoryRoute=require('./routes/category/categoryRoute');
const {errorHandler, notFound}=require('./middlewares/error/errorHandler')
dbConnect();
app.use('/api/user',userRouter);
app.use('/api/posts',postRoute);
app.use('/api/comment',CommentRoutes);
app.use('/api/category',categoryRoute);
app.use(notFound);
app.use(errorHandler);
const PORT=5000;

app.listen(PORT,()=>{
  console.log(`server listening on port ${PORT}`);
})
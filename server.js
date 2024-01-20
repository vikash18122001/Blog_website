const express=require("express");
const app=express();
app.use(express.json());
const dbConnect=require("./config/db/dbConnect");
const userRouter=require("./routes/users/userRoutes")
const {errorHandler, notFound}=require('./middlewares/error/errorHandler')
dbConnect();
app.use('/api/user',userRouter);
app.use(notFound);
app.use(errorHandler);
const PORT=5000;

app.listen(PORT,()=>{
  console.log(`server listening on port ${PORT}`);
})
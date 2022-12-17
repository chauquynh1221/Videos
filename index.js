import  express  from "express";
import  mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./routes/user.js";
import videoRouter from "./routes/video.js";
import commentRouter from "./routes/comment.js";
import authRouter from "./routes/auth.js";
import cookieParser from "cookie-parser"
import cors from "cors";
import path from "path";
import {fileURLToPath} from 'url';




const app = express();
dotenv.config()
const port = 8800
const connect = () =>{
    mongoose
        .connect(process.env.MONGO)
        .then(()=>{
            console.log("Connection database is successfully !!")
        })
        .catch(err => {throw err;});
}

app.use(
    express.urlencoded({
      extended: true,
    }),
  );




app.use(cookieParser())
app.use(express.json());
app.use("/api",authRouter)
app.use("/api",userRouter)
app.use("/api",videoRouter)
app.use("/api",commentRouter)
app.use(
  cors()
);



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "/client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.use((err, req, res, next) => {
    const status = err.status   || 500
    const message = err.message || "some thing went wrong !"

    return res.status(status).json({
        success : false,
         status, message
    })
})


app.listen(process.env.PORT || 8800,()=>{
    connect();
    console.log(`Server is running at http://localhost:${port}` )
});
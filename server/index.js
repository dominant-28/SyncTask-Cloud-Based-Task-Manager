
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import morgan from "morgan"
import session from "express-session";
import passport from "./config/passport.js";
import dbConnection from "./utils/index.js"
import { errorhandler,routeNotFound } from "./middlewares/errorMiddleware.js";
import routes from "./routes/index.js";
dotenv.config()


dbConnection()


const PORT=process.env.PORT|| 6000
const app=express()
app.use(
    cors({
    origin:['http://localhost:3000','http://localhost:3001','https://the-task-manager-ten.vercel.app'],
    methods:['GET',"POST","PUT","DELETE"],
    credentials:true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan("dev"))
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );
app.use(passport.initialize());
app.use(passport.session());
app.use("/api",routes)
 app.use(routeNotFound)
 app.use(errorhandler)

app.listen(PORT,()=>{console.log(`Server listening on ${PORT}`)})

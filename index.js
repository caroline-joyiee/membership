import express from "express";
import mongoose from "mongoose";
import { dbConnection } from "./config/db.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRouter from "./routes/user_route.js";
import cors from "cors";
import { memberRouter } from "./routes/member_route.js";
import { checkUserAuth } from "./middleware/auth.js";
import expressOasGenerator from "@mickeymond/express-oas-generator";

//Create an app

const app = express();
app.use(cors({ credentials: true, origin: "*" }))

expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['user', 'member'],
    mongooseModels: mongoose.modelNames(),
})


dbConnection();


//middleware
app.use(express.json());


app.use("/api/v1/health", (req, res) => {
    res.json({ status: "UP"})
})

app.use(express.static('image'));
app.use(userRouter);
app.use(memberRouter);



app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.Mongo_Url})
}))

// app.use(checkUserAuth);


const port = process.env.PORT || 6345
app.listen(port, () => {
    console.log(`App is working on ${port} channel`)
})




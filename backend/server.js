import express from "express";
import connectDB from "./db/db.js";




const app = express();
const port = 3000
connectDB()



app.get("/",(req,res)=>{
    return res.send("hello world")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`);
});

// "eylem" routerını buraya yazın

const express=require("express");
const router = express.Router()

router.get("/",(req,res)=>{
    res.send("eylemler sayfasındasın")
})

module.exports=router
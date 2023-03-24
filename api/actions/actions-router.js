// "eylem" routerını buraya yazın

const express=require("express");
const router = express.Router()
const Action=require("./actions-model")
const mw=require("./actions-middleware")

router.get("/",async (req,res,next)=>{
    try {
        const actions=await Action.get()
        res.status(201).json(actions)
    } catch (error) {
        next(error)
    }
})

router.get("/:id",mw.checkId,async (req,res,next)=>{
    try {
        const id = req.params.id;
        const action=await Action.get(id)
        res.status(201).json(action)
    } catch (error) {
        next(error)
    }
})

router.post("/",mw.checkBody,mw.checkProjectId,async (req,res,next)=>{
    try {
        let newAction=await Action.insert(req.body)
        res.status(201).json(newAction)
    } catch (error) {
        next(error)
    }
})

router.put("/:id",mw.checkBody,mw.checkProjectId,async (req,res,next)=>{
    try {
        const id=req.params.id
        const changes=req.body
        let updatedAction=await Action.update(id,changes)
        res.status(201).json(updatedAction)
    } catch (error) {
        next(error)
    }
})

router.delete("/:id",mw.checkId,async (req,res,next)=>{
    try {
        const id = req.params.id;
        await Action.remove(id)
        res.status(201).json({message:id+" id li action silindi"})
    } catch (error) {
        next(error)
    }
})

module.exports=router
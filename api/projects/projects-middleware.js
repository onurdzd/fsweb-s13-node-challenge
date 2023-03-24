// projects ara yazılımları buraya
const Project=require("./projects-model")

const checkId=async (req,res,next)=> {
    const id=req.params.id
    const isProject=await Project.get(id);
    if(isProject){
        next()
    }else{
        res.status(404).json({message:"Belirtilen idli proje yok"})
    }
}
const bodyCheck= (req,res,next)=> {
    const body= req.body
    if(!body.name ||!body.description  ){
        res.status(400).json({message:"Eksik bilgi gönderdin"})
    }else{
        next()
    }
}

module.exports={
    checkId,
    bodyCheck
}
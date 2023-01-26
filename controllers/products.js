const getAllProductsStatis = async(req,res)=>{
    res.status(200).json({msg:'products static testing route'})
}
const getAllProducts = async(req,res)=>{
    res.status(200).json({msg:'products testing route'})
}


module.exports = {
    getAllProductsStatis,
    getAllProducts
}
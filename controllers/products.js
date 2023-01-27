const { query } = require('express');
const Product = require('../models/products');

const getAllProductsStatis = async(req,res)=>{
    const product = await Product.find({featured:true})
    res.status(200).json({product})
}
const getAllProducts = async(req,res)=>{
    const {featured,company,name,sort,fields,numericFilters} = req.query
    const queryObject = {}
    console.log(queryObject)
    if(featured){
        queryObject.featured = featured ==='true'?true:false
    }
    if(company){
        queryObject.company= company
    }
    if(name){
        queryObject.name = {$regex:name,$options:'i'}
    }
    if(numericFilters){        
        const operateMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }
        const regExp = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regExp,(match)=>`-${operateMap[match]}-`)
        const option = ['price','rating'];
        filters = filters.split(',').forEach((item)=>{
        const [field,operator,value] = item.split('-')
        if(option.includes(field)){
            queryObject[field] = {[operator]:Number(value)}
        }
        console.log(queryObject)
    })
    console.log(filters)
    }
    console.log(queryObject)
    let results = Product.find(queryObject)
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = results.sort(sortList)
    }
    else{
        result = results.sort('createdAt')
    }
    if(fields){
        const fieldList = fields.split(',').join(' ')
        result = results.select(fieldList)
    }
    const page = Number(req.query.page) ||1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1) * limit
    result = result.skip(skip).limit(limit)
    const products = await result

    // const products = await Product.find(queryObject)
    res.status(200).json({nbhits:products.length,products})
}

module.exports = {
    getAllProductsStatis,
    getAllProducts
}
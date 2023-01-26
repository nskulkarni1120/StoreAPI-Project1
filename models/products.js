const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Name is must"]
    },
    price:{
        type:Number,
        require:[true,"NaPriceme is must"]
    },
    featured:{
        type:Boolean,
        default:false
    },rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        dafault:Date.now(),
    },
    copany:{
        type:String,
        enum:{
            values:['ikea','liddy','caressa','marcos'],
            message:"{VALUES} is not supported",
        },
        // enum:['ikea','liddy','caressa','marcos'],
    }
})

module.exports = mongoose.model('Product',productSchema)
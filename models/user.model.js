const {Schema , model } = require('mongoose')

    const schema = Schema({
    name:String,
    email:String,
    password:String,
    age:Number,
    id:String,
    verified:{
    type:Boolean,
    default:false
    },
    pic_url:{
        type:String,
        default:'user.png'
    }
    })




module.exports=model('user',schema)
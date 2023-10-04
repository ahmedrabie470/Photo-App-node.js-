const photoModel = require('../models/photo.model')

    module.exports.addPhoto = async(req,res)=>{
        const {createdBy} = req.body
        if(req.file){
            await photoModel.insertMany({path:req.file.filename,createdBy})
            res.json({message:'success'})
        }else{
            res.json({message:'you can not upload eny file else images' })
        }
        }


    module.exports.up= async (req,res)=>{
        const {_id,createdBy} = req.body
        const post =  await photoModel.findOne({_id , up : {$in: [createdBy] }  });
        console.log(post);
        if(post) {
            await photoModel.findByIdAndUpdate(_id,{
                $inc: {count: -1 } ,
                $pull: { up: createdBy},

            })
            res.json({message:'success' , like : false})
            }else{
            await photoModel.findByIdAndUpdate(_id,{
                $inc: {count: 1 } ,
                $push: { up: createdBy},
                $pull: { down: createdBy}

            })
            res.json({message:'success',  like : true})
        }
        }

    module.exports.down=async(req,res)=>{

        const {_id , createdBy}= req.body
        const post =  await photoModel.findOne({_id , down : { $in : [ createdBy] }})
        if(post) {
            await photoModel.findByIdAndUpdate(_id,{
                $inc: {count: 1 } ,
                $pull: { down: createdBy}
                
            })
            res.json({message:'success' , like : false})
            }else{
            await photoModel.findByIdAndUpdate(_id,{
                $inc: {count: -1 } ,
                $push: { down: createdBy},
                $pull: { up: createdBy}

            })
            res.json({message:'success' , like : true})
        }
      
        }


    module.exports.getPhotos= async (req,res) =>{
        let page_number = req.query.page
        if(!page_number||page_number<=0){
            page_number=1
        }
        const page_limit = 5    
        const skip = (page_number-1)*page_limit
        const count = await photoModel
        .find({}).count()
        const photos = await photoModel
        .find({})
        .sort({count:-1})
        .populate('createdBy up down' , 'name pic_url -_id')
        .skip(skip).limit(page_limit) ;
        res.json ({pages:Math.ceil((count/page_limit)),page:page_number, photos})
    }
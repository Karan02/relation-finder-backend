
const Tag = require("../models/tag.model")

exports.getTags =async (req,res) =>{
    const tags = await Tag.find({})
    res.json({
        status:true,
        tags:tags
    })
}

exports.addTags =async (req,res) => {

    const tags = new Tag({
        name:req.body.tag
    })
    tags.save(function(err,results){
        res.json({
            status:true
        })
    })
   
}
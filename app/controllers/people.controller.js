const People = require("../models/people.model")

exports.getPeople =async (req,res) =>{
    const people = await People.find({})
    res.json({
        status:true,
        people:people
    })
}

exports.addPeople = async (req,res) => {
     
    const people = new People({
        name:req.body.people
    })
    people.save(function(err,results){
        res.json({
            status:true
        })
    })
   
    
   
}
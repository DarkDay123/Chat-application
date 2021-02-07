const mongo = require('../../mongodb/connect').client();

module.exports = (req,res) =>{
    console.out = (a) => { console.log(`[get_msg] ${a}`) }
    var messages = mongo.db('messenger').collection('message')
    /** Querry the db to see if a user with the same username exists or not */
    messages.find({ reciever : req.body.username, read: false}).toArray((err,docs)=>{
        if(err){
            console.out(err);
            res.status(200).send({authentificated : false})
        } else {
            /** Ensure that all messages have the field read onto true */
            res.status(200).send({authentificated : true, data: docs})
        }
    })
}
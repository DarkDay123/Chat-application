const mongo = require('../../mongodb/connect').client();

module.exports = (req,res) =>{
    console.out = (a) => { console.log(`[get_msg] ${a}`) }
    var messages = mongo.db('messenger').collection('message')
    /** Querry the db to see if a user with the same username exists or not */
    let msgID = req.body.username + req.body.sender;
    messages.find({msgID: msgID.split('').sort().toString()}).toArray((err,docs)=>{
        if(err){
            console.out(err);
            res.status(200).send({authentificated : false})
        } else {
            /** Ensure that all messages have the field read onto true */
            if(docs[0] && docs[0].reciever === req.body.username)
                messages.updateMany({msgID: msgID.split('').sort().toString()},{$set : {read : true} },{upsert: false},(err)=>{
                    if(err){
                        console.out(err);
                    }
                });

            res.status(200).send({authentificated : true, data: docs})
        }
    })
}
const mongo = require('../../mongodb/connect').client();

module.exports = (req, res) => {
    console.out = (a) => { console.log(`[send_msg] ${a}`) }
    /** Querry the db to see if a user with the same username exists or not */
    let msgID = req.body.username + req.body.reciever;

    var messages = mongo.db('messenger').collection('message')
    messages.insertOne({
        msgID       : msgID.split('').sort().toString(),
        sender      : req.body.username,
        reciever    : req.body.reciever,
        message     : req.body.message,
        read        : false,
        timestamp   : Date.now(),
    },(err)=>{
        if(err){
            console.out(err)
            res.status(200).send({authentificated : false})
        } else {
            res.status(200).send({authentificated : true, sent : true})
        }
    })
}
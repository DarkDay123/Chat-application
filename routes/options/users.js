const mongo = require('../../mongodb/connect').client();

module.exports = (req,res) =>{
    console.out = (a) => { console.log(`[users] ${a}`) }
    /** Querry the db to see if a user with the same username exists or not */
    mongo.db('messenger').collection('users').find({}).project({ _id: 0, username : 1}).toArray((err,docs)=>{
        if(err){
            console.out(err);
            res.status(200).send({authentificated : false})
        } else {
            res.status(200).send({authentificated : true, users : docs});
        }
    })
}
const mongo = require('../mongodb/connect').client();

module.exports = (username,password) =>{
    console.out = (a) => { console.log(`[checkAuth] ${a}`) }
    /** Querry the db to see if a user with the same username exists or not */
    var users = mongo.db('messenger').collection('users')

    return new Promise((resolve,reject)=>{
        users.findOne({username : username, password : password},(err,result)=>{
            if(err){
                console.out(err);
                resolve(false);
            } else {
                if(result){
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        })
    })
}
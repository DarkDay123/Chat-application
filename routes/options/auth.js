const mongo = require('../../mongodb/connect').client();

module.exports = (req, res) => {
    console.out = (a) => { console.log(`[auth] ${a}`) }
    /** Querry the db to see if a user with the same username exists or not */
    var users = mongo.db('messenger').collection('users')
    users.findOne({ username: req.body.username }, (err, result) => {
        if (err) {
            console.out(err)
            res.status(200).send({ authentificated: false, err: err })
        } else {
            if (result) {
                if (result.password === req.body.password) {
                    console.out(`User ${req.body.username} authentificated !`)
                    res.status(200).send({ authentificated: true })
                } else {
                    console.out(`Bad pass for user ${req.body.username} !`)
                    res.status(200).send({ authentificated: false })
                }
            } else {
                users.insertOne({ username: req.body.username, password: req.body.password }, (err) => {
                    if (err) {
                        console.out(err)
                        res.status(200).send({ authentificated: false, err: err })
                    } else {
                        console.out(`User ${req.body.username} registered !`)
                        res.status(200).send({ authentificated: true })
                    }
                })
            }
        }
    })
}
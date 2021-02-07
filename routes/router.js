module.exports = (app)=>{
    app.get('/', (req,res)   =>{
        res.sendFile('auth.html', { root:'C:\\Users\\iosif\\Desktop\\basic_messenger\\client'})
    })
    app.get('/auth', (req,res)   =>{
        res.sendFile('auth.html', { root:'C:\\Users\\iosif\\Desktop\\basic_messenger\\client'})
    })
    app.get('/feed', (req,res)   =>{
        res.sendFile('feed.html', { root:'C:\\Users\\iosif\\Desktop\\basic_messenger\\client'})
    })

    app.post('/auth',       (req,res)   =>{
        require('./options/auth')(req,res);
    })

    app.post('/users',      async (req,res)   =>{
        var pass = await require('../utils/checkAuth')(req.body.username, req.body.password);
        if(pass){
            require('./options/users')(req,res);
        } else {
            res.status(200).send({authentificated : false})
        }
    })

    app.post('/send_msg',   async (req,res)   =>{
        var pass = await require('../utils/checkAuth')(req.body.username, req.body.password);
        if(pass){
            require('./options/send_msg')(req,res);
        } else {
            res.status(200).send({authentificated : false})
        }
    })

    app.post('/get_msg',    async (req,res)   =>{
        var pass = await require('../utils/checkAuth')(req.body.username, req.body.password);
        if(pass){
            require('./options/get_msg')(req,res);
        } else {
            res.status(200).send({authentificated : false})
        }
    })

    app.post('/get_new',    async (req,res)   =>{
        var pass = await require('../utils/checkAuth')(req.body.username, req.body.password);
        if(pass){
            require('./options/get_new')(req,res);
        } else {
            res.status(200).send({authentificated : false})
        }
    })
}
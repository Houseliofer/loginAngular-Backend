const  express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');

const mysqlConnection = require('../connection/connection'); // Path: api/connection/connection.js
const { JsonWebTokenError } = require('jsonwebtoken');

router.get('/', (req, res) => {   // Path: api/routes/user.js
    mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    }   )   ;
}   )   

router.post('/singin', (req, res) => {
    const {userName, pass} = req.body;
    mysqlConnection.query('SELECT userName,roleId FROM user WHERE userName = ? AND pass = ?', 
        [userName, pass],
        (err, rows, fields) => {
        if(!err){
            if(rows.length > 0){
                let data = JSON.stringify(rows[0]);
                const token = jwt.sign(data,'stil')
                res.json({token})
            }else{
                res.json({message: 'Usuario o contraseña incorrecta'});
            }
        }else{
            console.log(err);
        }
    });
})

router.post('/test',verifyToken,(req,res)=>{
    console.log(req.data)
    res.json('Informacion secreta')
})

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).json('unauthorized request')
    }

    const token = req.headers.authorization.substring(7)
    
    if(token !== 'null'){
        const payload = jwt.verify(token,'stil') //change the word 'stil' for a secret word in .env
        //console.log(payload)
        req.data = payload
        //req.userId = payload.userId
        next()
    }else{
        return res.status(401).json('empty token')
    }
}

module.exports = router;


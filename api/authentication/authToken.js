const jwt = require("jsonwebtoken");
const token = require("../token/token");

let isAuth = (req, res, next) => {
    const tokenFromClient = req.headers.access_token||req.body.access_token
    if (tokenFromClient) {
        try {
            token.verifyToken(tokenFromClient, process.env.ACCESS_TOKEN)
            .then((data)=>{
                req.body.username =data.username;
                req.body.id =data.id;
                next();
            })
            .catch((err)=>res.send(err))
            
        } catch (error) {
            return res.status(401).json({
                message: 'Unauthorized.',
            });
        }
    } else {
        return res.status(403).send({
            message: 'No token provided.',
        });
    }
}

module.exports = {
    isAuth: isAuth,
};
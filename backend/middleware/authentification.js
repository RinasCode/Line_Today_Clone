const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index")

async function authentication(req, res, next){
    try {

        const {authorization} = req.headers

        // console.log(authorization, "<,<<<<<>>>>>>>>>>");

        if(!authorization) throw {name: "Unauthorized"}

        const access_token = authorization.split(" ")[1]
        // console.log(access_token);

        const payload = verifyToken(access_token)

        // console.log(payload);

        const user = await User.findOne({
            where: {
                email: payload.email
            }
        })
        // console.log(user);
        
        if(!user) throw {name: "Unauthorized"}

        req.loginInfo = {
            userId: user.id,
            email: user.email,
            role: user.role
        }
        // console.log(req.loginInfo)
        next()
    } catch (error) {
        console.log(error)
        next(error)
    }
} 

module.exports = authentication
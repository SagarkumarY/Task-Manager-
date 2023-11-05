
// module.exports = fetchuser;

const jwt = require('jsonwebtoken');
const JWT_SECRET = "Those who do not understand true pain can never understand true peace"

const fetchuser = (req, res, next) => {
    // Get the user from the JWT token  and add the user object to req
    try {
        const token = req.header('auth-token');
         if(!token){
            res.status(401).send({error:"Please authenticate using a vaild token"})
         } 
          const data = jwt.verify(token,JWT_SECRET);
          req.user = data.user;
          next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a vaild token"})
    }
};

module.exports = fetchuser;
   


    // // Check for the 'x-auth-token' header for the token
    // const token = req.header('x-auth-token');
    
    // if (!token) {
    //     return res.status(401).json({ error: "Please authenticate using a valid token" });
    // }
    
    // try {
    //     const data = jwt.verify(token, JWT_SECRET);
    //     req.user = data.user;
    //     next();
    // } catch (error) {
    //     res.status(401).json({ error: "Please authenticate using a valid token" });
    // }
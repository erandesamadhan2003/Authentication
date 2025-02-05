import jsonwebtoken from 'jsonwebtoken';

export const authMiddleware = (req,res ,next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({
            success : false,
            message : 'Access denied, No user Found. plase login to continue'
        })
    }

    // decode the token
    try {
        const decodedToken = jsonwebtoken.verify(token,process.env.JSONWEBTOKEN_SECRETE_KEY);
        console.log(decodedToken);

        req.userInfo = decodedToken;
        next();

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : 'Access denied, No user Found. plase login to continue'
        })
    }
}
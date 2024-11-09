const jwt=require('jsonwebtoken');  

const generateJwtToken = () => {
    return jwt.sign(userData, process.env.private_key, { expiresIn: '1h' }); 
}

const validateJwtToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, process.env.private_key, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    });    

}
module.exports = { generateJwtToken, validateJwtToken };
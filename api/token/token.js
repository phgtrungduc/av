const jwt = require("jsonwebtoken");

let generateToken = (data, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      data,
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
    });
  });
}





let verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
}
// let refreshToken = async (req, res) => {
//   console.log(req.body.name);
//   const refreshTokenFromClient = req.body.refreshToken;
//   if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
//     try {
//       const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
//       const userFakeData = decoded.data;
//       const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
//       return res.status(200).json({accessToken});
//     } catch (error) {
//       debug(error);
//       res.status(403).json({
//         message: 'Invalid refresh token.',
//       });
//     }
//   } else {
//     return res.status(403).send({
//       message: 'No token provided.',
//     });
//   }
// };
module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken,
};

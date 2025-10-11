const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

export const getGenerateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    JWT_SECRET,{expiresIn:'7d'}
  );
};

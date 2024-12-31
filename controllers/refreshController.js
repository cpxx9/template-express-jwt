require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const refreshController = async (req, res, next) => {
  const { cookies } = req;
  if (!cookies?.jwt)
    return res
      .status(401)
      .json({ success: false, msg: 'No token present in request' });
  const refreshToken = cookies.jwt;
  try {
    const user = await prisma.user.findFirst({
      where: {
        refresh: refreshToken,
      },
    });

    if (!user) {
      return res.status(403).json({ success: false, msg: 'Incorrect token' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
      if (err || user.id !== decoded.sub)
        return res
          .status(403)
          .json({ success: false, msg: 'Invalid response' });
      const accessToken = jwt.sign(
        { sub: user.id, user, iat: Math.floor(Date.now() / 1000) },
        process.env.ACCESS_SECRET,
        { expiresIn: '10s' }
      );
      delete user.hash;
      delete user.salt;
      delete user.refresh;
      res.status(200).json({
        success: true,
        token: `Bearer ${accessToken}`,
        // change to 10-15m for prod
        expiresIn: '10s',
      });
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { refreshController };

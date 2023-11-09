const axios = require("axios");
const jwt = require("jsonwebtoken");

// verify user that request api is authorized from token endpoint
// checkMailUsed -> when client is created user or login or resgister email
// Google OAuth -> verify token of google ?? opinally check
async function verifyToken(token, secret) {
  try {
    const decoded = jwt.verify(token, secret);
    // console.log("Decode :", decoded); // this will print out the payload of the token
    return decoded;
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return null;
  }
}

exports.verifyRoleAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    const decodedToken = await verifyToken(token, process.env.JWT_SECRET); // Make sure to use your JWT secret here
    if (decodedToken.Role == "Admin") {
      return next();
    }
    return res
      .status(401)
      .json({ message: "Your permission not enough for access this api" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Error in token decode" });
  }
};

exports.verifyCookieToken = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    // console.log("token", token);
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }
    const decodedToken = await verifyToken(token, process.env.JWT_SECRET); // Make sure to use your JWT secret here
    if (!decodedToken) {
      return res.status(401).json({ message: "Token verification failed" });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Error in token decode" });
  }
};

exports.checkTokenGMiddle = async (req, res, next) => {
  var { Token, Email } = req.body;

  try {
    const g_token = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${Token}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
          Accept: "routerlication/json",
          value: "same-origin",
        },
      }
    );

    const token_mail = g_token.data.email;
    // console.log("token_mail", token_mail);
    if (!Boolean(token_mail)) {
      res.status(401).json({
        token_status: "invalid",
        error: "Invalid token > This token is not found or will expire.)",
      });
      return;
    }
    if (token_mail !== Email) {
      res.status(401).json({
        token_status: "invalid",
        error: "This is not your token.",
      });
      return;
    }
    if (g_token.status === 200) {
      // next();
      // console.log("vaild g token correct");
      return next();
    }
    return res.status(400).json({ message: "some error" });
  } catch (err) {
    console.log("Error in token decode", err);
    return res.status(400).json({ message: "Error in token decode" });
  }
};

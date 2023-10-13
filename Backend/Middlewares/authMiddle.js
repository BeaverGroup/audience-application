const axios = require("axios");

// verify user that request api is authorized from token endpoint

// checkMailUsed -> when client is created user or login or resgister email
// exports.checkMailUsed = async (req, res,nex) => {

// Google OAuth -> verify token of google ?? opinally check

exports.checkTokenG_Middle = async (req, res, next) => {
  var { Token, Email } = req.body;

  try {
    const GToken = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${Token}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
          Accept: "routerlication/json",
          value: "same-origin",
        },
      }
    );

    const token_mail = GToken.data.email;
    console.log("token_mail", token_mail);
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
    if (GToken.status === 200) {
      next();
      console.log("vaild g token correct");
      return;
      //   return res.status(400).json({ message: "vaild g token correct" });
    }
    return res.status(400).json({ message: "some error" });
  } catch (err) {
    console.log("Error in token decode", err);
    return res.status(400).json({ message: "Error in token decode" });
  }
};

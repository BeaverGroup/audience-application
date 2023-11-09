const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const {
  infoUserByEmail,
  allinfoUser,
  infoUserByID,
  removeUserByID,
  removeUserByEmail,
  updateUserByID,
  updateUserByEmail,
} = require("../Controllers/userController");
const {
  addSub,
  unSub,
  allSub,
  updateSub,
} = require("../Controllers/subController");

const {
  verifyCookieToken,
  verifyRoleAdmin,
  verifiedPermissionsID,
} = require("../Middlewares/authMiddle");
const jsonParser = bodyParser.json();
const {
  addVote,
  removeVote,
  allVotes,
} = require("../Controllers/voteController");
require("dotenv").config();

//user
router.get("/infoByEmail", jsonParser, verifyCookieToken, infoUserByEmail); 
router.get("/infoByID", jsonParser, verifyCookieToken, infoUserByID);
router.get(
  "/list",
  jsonParser,
  verifyCookieToken,
  verifyRoleAdmin,
  allinfoUser
); // register user
router.post(
  "/updateByID",
  jsonParser,
  verifyCookieToken,
  verifyRoleAdmin,
  updateUserByID
); // update user
router.post(
  "/updateByEmail",
  jsonParser,
  verifyCookieToken,
  verifyRoleAdmin,
  updateUserByEmail
); // update user
router.delete(
  "/removeByID",
  jsonParser,
  verifyCookieToken,
  verifyRoleAdmin,
  removeUserByID
);
router.delete(
  "/removeByEmail",
  jsonParser,
  verifyCookieToken,
  verifyRoleAdmin,
  removeUserByEmail
);

// vote
router.delete(
  "/unvote/:id",
  jsonParser,
  verifyCookieToken,
  verifiedPermissionsID,
  removeVote
);
router.post(
  "/vote/:id",
  jsonParser,
  verifyCookieToken,
  verifiedPermissionsID,
  addVote
);
router.get(
  "/userAllvote/:id",
  jsonParser,
  verifyCookieToken,
  verifiedPermissionsID,
  allVotes
);

// sub
router.post(
  "/subscribe/:id",
  jsonParser,
  verifyCookieToken,
  verifiedPermissionsID,
  addSub
);
router.delete(
  "/unsubscribe/:id",
  jsonParser,
  verifyCookieToken,
  verifiedPermissionsID,
  unSub
);
router.get(
  "/userAllsub/:id",
  jsonParser,
  verifyCookieToken,
  verifiedPermissionsID,
  allSub
);
router.post(
  "/updateSub/:id",
  jsonParser,
  verifyCookieToken,
  verifiedPermissionsID,
  updateSub
);

module.exports = router;

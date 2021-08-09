const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const logger = require("../logger/logger");

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // this is the expiry time in seconds
  },
});
const userToken = mongoose.model("userToken", tokenSchema);

class TokenModel {
  saveToken = (userId, hash, callback) => {
    const newToken = new userToken({
      userId: userId,
      token: hash,
      createdAt: Date.now(),
    });
    newToken.save((error, data) => {
      if (error) {
        logger.error("Error while saving the new token", error);
        callback(TypeError, null);
      } else {
        logger.info("Token saved successfully", data);
        callback(null, data);
      }
    });
  };

  findTokenByUserId = (id, callback) => {
    Token.findOne({ userId: id }, (error, data) => {
      if (error) {
        logger.error("Error while finding token by user id", error);
        callback(error, null);
      } else {
        logger.info("Token is found", data);
        callback(null, data);
      }
    });
  };

//   deleteTokenByUserId = (id, callback) => {
//     Token.deleteOne({ userId: id }, (error, data) => {
//       if (err) {
//         logger.error("Error while deleting token ", error);
//         callback(error, null);
//       } else {
//         logger.info("Token is deleted");
//         callback(null, "Token is deleted");
//       }
    //  });
  // };
}
module.exports = new TokenModel();
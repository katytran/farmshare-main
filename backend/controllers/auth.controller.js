const utilsHelper = require("../helpers/utils.helper");
const bcrypt = require("bcrypt");
const User = require("../models/user");

/**
 * GET /api/equipments
 * Login a user
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) return next(new Error("401 - Email not exists"));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new Error("401 - Wrong password"));

    const accessToken = await user.generateToken();
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { user, accessToken },
      null,
      "Login successfully"
    );
  } catch (error) {
    next(error);
  }
};

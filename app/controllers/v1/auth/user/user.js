const argon2 = require("argon2");
const handleAsync = require("../../../../utilities/handleAsync");
const MESSAGES = require("../../../../helpers/messages");
const UserInstance = require("../../../../models/auth/repository/userRepository")

const handleCreateNewUser = handleAsync(async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await UserInstance.findOneDoc({ email });

  if (existingUser) {
    return res.conflict(MESSAGES.apiErrorStrings.DATA_ALREADY_EXISTS("User"));
  }

  const hashedPassword = await argon2.hash(password);

  const newUser = await UserInstance.createDoc({
    username,
    email,
    password: hashedPassword,
  });

  return res.success({ username: newUser.username, email: newUser.email }, 201);
});
const handleLoginUser = handleAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserInstance.findOneDoc({ email });

  if (!user) {
    return res.notFound(MESSAGES.apiErrorStrings.DATA_NOT_EXISTS("Username"));
  }

  const isMatch = await argon2.verify(user.password, password);

  console.log("isMatch", isMatch);

  if (!isMatch) {
    return res.unauthorized(
      MESSAGES.apiErrorStrings.DATA_IS_INCORRECT("Password")
    );
  }

  const token = user.generateAccessJWT();
  console.log("token", token);

  return res.success({msg:MESSAGES.apiSuccessStrings.LOGIN("User"),token:token});
});

module.exports = { handleCreateNewUser, handleLoginUser };

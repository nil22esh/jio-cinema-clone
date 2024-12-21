import UserModel from "../Models/user.model.js";

export const createUser = async ({
  username,
  email,
  password,
  profilePicture,
  role,
}) => {
  if ((!username, !email, !password)) {
    throw new Error("Please fill all the required fields!");
  }
  try {
    const newUser = UserModel.create({
      username,
      email,
      password,
      profilePicture,
      role,
    });
    return newUser;
  } catch (error) {
    throw new Error(`CreateUser Error: ${error}`);
  }
};

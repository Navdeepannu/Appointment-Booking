import jwt from "jsonwebtoken";

// middleware- user authentication
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers; // get token from header
    // console.log(token);

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again..",
      });
    }

    // deconde the token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    console.log("User not authorized: ", error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;

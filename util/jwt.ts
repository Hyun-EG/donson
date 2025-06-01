import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export const signJWT = (payload: object) => {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
};

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
};

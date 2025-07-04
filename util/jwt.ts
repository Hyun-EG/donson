import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export interface MyJwtPayload extends JwtPayload {
  ocid?: string;
}

export const signJWT = (payload: MyJwtPayload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
};

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, SECRET) as MyJwtPayload;
  } catch (error) {
    return null;
  }
};

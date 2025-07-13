import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_ACCESS = process.env.ACCESS_SECRET!;
const REFRESH_ACCESS = process.env.REFRESH_SECRET!;

export interface MyJwtPayload extends JwtPayload {
  ocid?: string;
}

export const accessToken = (payload: MyJwtPayload) => {
  return jwt.sign(payload, SECRET_ACCESS, { expiresIn: "1h" });
};

export const refreshToken = (payload: MyJwtPayload) => {
  return jwt.sign(payload, REFRESH_ACCESS, { expiresIn: "30d" });
};

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, SECRET_ACCESS) as MyJwtPayload;
  } catch (error) {
    return null;
  }
};

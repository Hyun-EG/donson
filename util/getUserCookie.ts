import { cookies } from "next/headers";
import { MyJwtPayload, verifyJWT } from "./jwt";

export async function getUserCookies() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;
  const decoded = token ? (verifyJWT(token) as MyJwtPayload) : null;

  if (!token) {
    return null;
  }

  if (!decoded || !decoded.ocid) {
    return null;
  }

  return {
    ocid: decoded.ocid,
  };
}

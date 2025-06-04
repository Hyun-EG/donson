import { cookies } from "next/headers";
import { MyJwtPayload, verifyJWT } from "./jwt";

export async function getUserCookies() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;
  const decoded = token ? (verifyJWT(token) as MyJwtPayload) : null;

  if (!decoded) {
    return null;
  }

  const userId = decoded?.userId;
  if (!userId) {
    return null;
  }

  return { userId, decoded };
}

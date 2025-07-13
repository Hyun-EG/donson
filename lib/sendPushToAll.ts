import webpush from "web-push";
import { connectDB } from "@/mongodb";

webpush.setVapidDetails(
  "mailto:codiee@naver.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

type WebPushSubscription = {
  endpoint: string;
  expirationTime: number | null;
  keys: {
    p256dh: string;
    auth: string;
  };
};

export async function sendPushToAll(title: string, body: string) {
  const db = (await connectDB).db("donson");
  const subscriptions = await db
    .collection<WebPushSubscription>("subscriptions")
    .find()
    .toArray();

  const payload = JSON.stringify({ title, body });

  for (const sub of subscriptions) {
    await webpush.sendNotification(sub, payload);
  }
}

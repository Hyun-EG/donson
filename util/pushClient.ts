export async function subscribeUserToPush(): Promise<PushSubscription | null> {
  if (!("serviceWorker" in navigator)) return null;
  const registration = await navigator.serviceWorker.ready;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;

  const convertedVapidKey = urlBase64ToUint8Array(
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
  );

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedVapidKey,
  });

  return subscription;
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const raw = window.atob(base64);
  return new Uint8Array([...raw].map((c) => c.charCodeAt(0)));
}

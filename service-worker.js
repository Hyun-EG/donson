self.addEventListener("push", (event) => {
  const data = event.data?.json();

  if (!data?.title || !data?.body) return;

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon || "/icons/icon-logo.png",
  });
});

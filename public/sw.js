self.addEventListener("push", function (event) {
  const data = event.data?.json();
  if (!data) return;

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon || "/icons/icon-logo.png",
  });
});

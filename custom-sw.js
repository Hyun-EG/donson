self.addEventListener("push", function (event) {
  console.log("푸시 수신됨");
  const data = event.data?.json();
  if (!data) return;

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon || "/icons/icon-logo.png",
  });
});

self.__WB_MANIFEST;

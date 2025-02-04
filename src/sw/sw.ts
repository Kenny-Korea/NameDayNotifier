import { precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from "workbox-core";

declare let self: ServiceWorkerGlobalScope;

// 서비스 워커 즉시 활성화
self.skipWaiting();
clientsClaim();

// 사전 캐시
precacheAndRoute(self.__WB_MANIFEST);

const pushHandler = (event: PushEvent) => {
  const data = event.data?.json();
  const options =
    data?.notification ||
    ({
      title: "테스트 알림",
      body: "안녕하세요",
      icon: "./agape-32.png",
      tag: data?.tag,
      data: {
        url: self.registration.scope,
      },
    } as NotificationOptions);

  const notificationOptions: NotificationOptions = {
    ...options,
    requireInteraction: false,
    vibrate: [200, 100, 200],
  };

  event.waitUntil(self.registration.showNotification(options.title, notificationOptions));
};

const clickHandler = (event: NotificationEvent) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data?.url || "/"));
};

self.removeEventListener("push", pushHandler);
self.removeEventListener("notificationclick", clickHandler);

self.addEventListener("push", pushHandler);
self.addEventListener("notificationclick", clickHandler);

// // 푸시 이벤트 처리
// self.addEventListener("push", (event: PushEvent) => {
//   console.log(event.data?.json());
//   const options = event.data?.json()?.notification || {
//     title: "테스트 알림",
//     body: "안녕하세요",
//     icon: "./agape-32.png",
//     data: {
//       url: self.registration.scope,
//     },
//   };

//   const notificationOptions: NotificationOptions = {
//     ...options,
//     requireInteraction: true,
//     vibrate: [200, 100, 200],
//   };

//   event.waitUntil(self.registration.showNotification(options.title, notificationOptions));
// });

// // 알림 클릭 이벤트 처리
// self.addEventListener("notificationclick", (event) => {
//   event.notification.close();

//   event.waitUntil(
//     clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
//       if (clientList.length > 0) {
//         return clientList[0].focus();
//       }
//       return clients.openWindow(event.notification.data?.url || "/");
//     })
//   );
// });

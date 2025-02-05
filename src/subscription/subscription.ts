export async function subscribePushNotification() {
  try {
    // 서비스 워커 지원 확인
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      throw new Error("푸시 알림이 지원되지 않는 브라우저입니다.");
    }

    // 알림 권한 요청
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      throw new Error("알림 권한이 거부되었습니다.");
    }

    // 서비스 워커 등록 확인
    const registration = await navigator.serviceWorker.ready;
    registration.showNotification("푸시 알림 구독이 완료되었습니다.", {
      body: "푸시 알람 구독이 완료되었습니다.",
      icon: "./agape-32.png",
    });

    // 기존 구독 확인
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      // 새로운 구독 생성
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: import.meta.env.VITE_PUBLIC_VAPID_KEY,
      });
    }
    console.log(subscription);

    // 구독 정보를 서버로 전송
    const response = await fetch(`${import.meta.env.VITE_API_GATEWAY_URL}/subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscription),
    });

    console.log(response);

    return true;
  } catch (error) {
    console.error("푸시 알림 구독 실패:", error);
    throw error;
  }
}

import {} from "../notification/subscription";

const Test = () => {
  const handleClick = async () => {
    try {
      // 구독 상태 확인
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      // if (!subscription) {
      //   // 구독되지 않은 경우 구독 진행
      //   await subscribePushNotification();
      // }

      // Lambda 함수 호출
      const response = await fetch(`${import.meta.env.VITE_API_GATEWAY_URL}/notification`);
      console.log(await response.json());

      if (!response.ok) {
        throw new Error("테스트 알림 전송에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("테스트 알림 전송에 실패했습니다.");
    }
  };

  return <button onClick={handleClick}>테스트</button>;
};

export default Test;

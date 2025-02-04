import "./main.css";

import Content from "./components/layout/Content";
import Header from "./components/layout/Header";
import Layout from "./components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { getAllNameDayData } from "./api/api";
import { getLocalStorageItems } from "./util/util.localStorage";
import { useEffect } from "react";
import { subscribePushNotification } from "./notification/subscription";
import Test from "./components/Test";

const App = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["nameDayData"],
    initialData: getLocalStorageItems("nameDayData"),
    queryFn: getAllNameDayData,
    staleTime: 0,
  });

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();

        if (!subscription) {
          // 구독이 없는 경우 새로 구독
          await subscribePushNotification();
        }

        // setIsSubscribed(true);
      } catch (error) {
        console.error("구독 상태 확인 실패:", error);
      }
    };

    checkSubscription();
  }, []);

  return (
    <Layout>
      <Test />
      <Header />
      <Content />
    </Layout>
  );
};

export default App;

{
  /* <div className="ml-10 flex gap-4 h-80">
<div className="h-full flex flex-col justify-between">
  {left1.split("").map((char, index) => (
    <span key={index} className="text-center">
      {char}
    </span>
  ))}
</div>
<div className="h-full flex flex-col justify-between">
  {right1.split("").map((char, index) => (
    <span key={index} className="text-center">
      {char}
    </span>
  ))}
</div>
<div className="h-full flex flex-col justify-between">
  {left2.split("").map((char, index) => (
    <span key={index} className="text-center">
      {char}
    </span>
  ))}
</div>
<div className="h-full flex flex-col justify-between">
  {right2.split("").map((char, index) => (
    <span key={index} className="text-center">
      {char}
    </span>
  ))}
</div>
<div className="h-full flex flex-col justify-between">
  {left3.split("").map((char, index) => (
    <span key={index} className="text-center">
      {char}
    </span>
  ))}
</div>
<div className="h-full flex flex-col justify-between">
  {right3.split("").map((char, index) => (
    <span key={index} className="text-center">
      {char}
    </span>
  ))}
</div>
</div> */
}

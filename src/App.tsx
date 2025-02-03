import "./main.css";

import Content from "./components/layout/Content";
import Header from "./components/layout/Header";
import Layout from "./components/layout/Layout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllNameDayData } from "./api/api";
import { getLocalStorageItems } from "./components/util/util.localStorage";
import { useEffect } from "react";
import { subscribePushNotification } from "./notification/subscription";
import { button } from "framer-motion/client";
import Test from "./components/Test";

const App = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["nameDayData"],
    initialData: getLocalStorageItems("nameDayData"),
    queryFn: getAllNameDayData,
    staleTime: 0,
  });
  console.log("data", data);

  if (isLoading) return <div>Loading...</div>;

  // useEffect(() => {
  //   const init = async () => {
  //     await subscribePushNotification();
  //     console.log("구독 완료");
  //   };
  //   init();
  // }, []);

  return (
    <Layout>
      <Test />
      <Header />
      <Content />
    </Layout>
  );
};

export default App;

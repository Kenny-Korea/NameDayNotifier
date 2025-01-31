import "./main.css";

import Content from "./components/layout/Content";
import Header from "./components/layout/Header";
import Layout from "./components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { getAllNameDayData } from "./api/api";
import { getLocalStorageItems } from "./components/util/util.localStorage";

const App = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["nameDayData"],
    initialData: getLocalStorageItems("nameDayData"),
    queryFn: getAllNameDayData,
    staleTime: 0,
  });
  console.log("data", data);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Layout>
      <Header />
      <Content />
    </Layout>
  );
};

export default App;

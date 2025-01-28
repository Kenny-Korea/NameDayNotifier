import "./main.css";

import Content from "./components/layout/Content";
import Header from "./components/layout/Header";
import Layout from "./components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { getAllNameDayData } from "./api/api";
import { getLocalStorageItems } from "./components/util/util.localStorage";

const App = () => {
  useQuery({
    queryKey: ["nameDayData"],
    initialData: getLocalStorageItems("nameDayData"),
    queryFn: getAllNameDayData,
    staleTime: Infinity,
  });

  return (
    <Layout>
      <Header />
      <Content />
    </Layout>
  );
};

export default App;

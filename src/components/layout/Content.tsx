import { useCallback, useState } from "react";
import Card from "../card/Card";
import { motion } from "framer-motion";
import LayoutComposition from "../card/LayoutComposition";
import { LayoutType } from "../../types/types";
import CardLayout from "./CardLayout";
import SearchBar from "../search/SearchBar";
import Today from "../Today";

const Content = () => {
  const [cardLayout, setCardLayout] = useState<LayoutType>("single");

  const toggleLayout = useCallback(
    (type: LayoutType) => {
      if (type === cardLayout) return;
      setCardLayout(type);
    },
    [cardLayout]
  );

  return (
    <div className="flex-1 grid grid-rows-[auto_auto_1fr] min-h-0">
      <Today />
      <div className="w-full h-20 flex justify-between items-center pt-2 pb-2">
        <SearchBar />
        <LayoutComposition cardLayout={cardLayout} toggleLayout={toggleLayout} />
      </div>
      <CardLayout>
        <motion.div
          className={`grid ${cardLayout === "single" ? "grid-cols-1" : "grid-cols-2"} gap-4`}
          layout
          transition={{ duration: 0.3 }}
        >
          <Card cardLayout={cardLayout}>1월</Card>
          <Card cardLayout={cardLayout}>2월</Card>
          <Card cardLayout={cardLayout}>3월</Card>
          <Card cardLayout={cardLayout}>4월</Card>
          <Card cardLayout={cardLayout}>5월</Card>
          <Card cardLayout={cardLayout}>6월</Card>
          <Card cardLayout={cardLayout}>7월</Card>
          <Card cardLayout={cardLayout}>8월</Card>
          <Card cardLayout={cardLayout}>9월</Card>
          <Card cardLayout={cardLayout}>10월</Card>
          <Card cardLayout={cardLayout}>11월</Card>
          <Card cardLayout={cardLayout}>12월</Card>
        </motion.div>
      </CardLayout>
    </div>
  );
};

export default Content;

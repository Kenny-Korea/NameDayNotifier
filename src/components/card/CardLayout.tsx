import { useState } from "react";
import Card from "./Card";
import { motion } from "framer-motion";
import LayoutComposition from "./LayoutComposition";
import { LayoutType } from "../../types/types";

const CardLayout = () => {
  const [layout, setLayout] = useState<LayoutType>("single");

  const toggleLayout = (type: LayoutType) => {
    if (type === layout) return;
    setLayout(type);
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-end pt-2 pb-2">
        <LayoutComposition layout={layout} toggleLayout={toggleLayout} />
      </div>

      <motion.div
        className={`grid ${layout === "single" ? "grid-cols-1" : "grid-cols-2"} gap-4`}
        layout
        transition={{ duration: 0.3 }}
      >
        <Card layout={layout}>1월</Card>
        <Card layout={layout}>2월</Card>
        <Card layout={layout}>3월</Card>
        <Card layout={layout}>4월</Card>
        <Card layout={layout}>5월</Card>
        <Card layout={layout}>6월</Card>
        <Card layout={layout}>7월</Card>
        <Card layout={layout}>8월</Card>
        <Card layout={layout}>9월</Card>
        <Card layout={layout}>10월</Card>
        <Card layout={layout}>11월</Card>
        <Card layout={layout}>12월</Card>
      </motion.div>
    </div>
  );
};

export default CardLayout;

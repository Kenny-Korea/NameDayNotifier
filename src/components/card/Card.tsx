import { motion } from "framer-motion";
import { LayoutType } from "../../types/types";

const Card = (props: { children: React.ReactNode; cardLayout: LayoutType }) => {
  const { children, cardLayout: layout } = props;
  return (
    <motion.div layout>
      <div className={`w-full ${layout === "grid" && "min-h-40"} bg-white layout-card transition-all duration-300`}>
        {children}
      </div>
    </motion.div>
  );
};

export default Card;

import { motion } from "framer-motion";
import { LayoutType } from "../../types/types";

const Card = (props: { children: React.ReactNode; layout: LayoutType }) => {
  const { children, layout } = props;
  return (
    <motion.div layout>
      <div
        className={`w-full ${
          layout === "grid" && "min-h-40"
        } bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300`}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Card;

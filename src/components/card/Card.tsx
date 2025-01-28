import { motion } from "framer-motion";
import { LayoutType } from "../../types/types";
import { DataType } from "../../types/model";
import { useMemo } from "react";

interface CardProps {
  month: number;
  monthlyData: Map<number, DataType[]> | undefined;
  cardLayout: LayoutType;
}

const Card = (props: CardProps) => {
  const { month, monthlyData, cardLayout } = props;
  const sortedData = useMemo(() => {
    return monthlyData ? Array.from(monthlyData.entries()).sort(([dayA], [dayB]) => dayA - dayB) : [];
  }, [monthlyData]);

  return (
    <motion.div layout>
      <div className={`w-full ${cardLayout === "grid" && "min-h-40"} bg-white layout-card transition-all duration-300`}>
        <p>{month + "월"}</p>
        {sortedData.length > 0 ? (
          sortedData.map(([day, dataArray]) => (
            <div key={day} className="border-b pb-2 mb-2 last:border-b-0 last:mb-0">
              <p className="font-medium text-gray-600">
                {month}월 {day}일
              </p>
              {dataArray.map((data, index) => (
                <div key={index} className="ml-4 mt-1">
                  <p className="text-sm">
                    <span className="font-semibold">{data.name}</span>
                    <span className="text-gray-500 ml-2">({data.catname})</span>
                  </p>
                  <p className="text-xs text-gray-500">{data.description}</p>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="text-gray-500">이번 달 축일자가 없습니다.</p>
        )}
      </div>
    </motion.div>
  );
};

export default Card;

import dayjs from "dayjs";
import Card from "./Card";
import { motion } from "framer-motion";
import { LayoutType } from "../../types/types";
import { useQueryClient } from "@tanstack/react-query";
import { getLocalStorageItems } from "../util/util.localStorage";
import { DataType } from "../../types/model";

type DataMap = Map<number, Map<number, DataType[]>>;

const savedNameDayData = getLocalStorageItems("nameDayData");

const currentMonth = dayjs().month() + 1;
const monthsArray = Array.from({ length: 12 }, (_, i) => {
  const month = (currentMonth + i) % 12 || 12; // 12로 나눈 나머지가 0이면 12로 변경
  console.log(month);
  return month;
});

const CardList = (props: { cardLayout: LayoutType }) => {
  const { cardLayout } = props;
  const queryClient = useQueryClient();
  const dataMap: DataMap | undefined = queryClient.getQueryData(["nameDayData"]);
  console.log(dataMap);

  return (
    <div className="w-full h-full overflow-y-auto min-h-0">
      <motion.div
        className={`grid ${cardLayout === "single" ? "grid-cols-1" : "grid-cols-2"} gap-4`}
        layout
        transition={{ duration: 0.3 }}
      >
        {monthsArray.map((month) => {
          const monthlyData = dataMap?.get(month);
          return <Card cardLayout={cardLayout} month={month} monthlyData={monthlyData} key={month} />;
        })}
      </motion.div>
    </div>
  );
};

export default CardList;

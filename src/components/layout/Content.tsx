import { useCallback, useState } from "react";
import ButtonWrapper from "../card/ButtonWrapper";
import { LayoutType } from "../../types/types";
import CardList from "../card/CardList";
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
      <div className="w-full flex items-stretch gap-4 py-4">
        <SearchBar />
        <ButtonWrapper cardLayout={cardLayout} toggleLayout={toggleLayout} />
      </div>
      <CardList cardLayout={cardLayout} />
    </div>
  );
};

export default Content;

import { useCallback, useState, useRef, memo } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  console.log(search);
  const timerRef = useRef<NodeJS.Timeout>();

  const handleTypeText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setSearch(e.target.value);
    }, 300);
  }, []);

  return (
    <input
      type="text"
      placeholder="Search"
      className="w-full h-10 p-1 pl-2 text-sm outline-none border-gray-300 rounded-md border"
      onChange={handleTypeText}
    />
  );
};

export default memo(SearchBar);

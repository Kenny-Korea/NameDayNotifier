import { useCallback, useState, useRef, memo } from "react";

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  console.log(searchKeyword);
  const timerRef = useRef<NodeJS.Timeout>();

  const handleTypeText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setSearchKeyword(e.target.value);
    }, 300);
  }, []);

  return (
    <input
      type="text"
      placeholder="이름을 입력하세요"
      className="w-full h-full min-h-0 px-3 p-1 pl-2 text-sm outline-none border-gray-300 rounded-md border"
      onChange={handleTypeText}
    />
  );
};

export default memo(SearchBar);

import { useCallback, useState, useRef } from "react";

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
    <div className="SearchBar">
      <input type="text" placeholder="Search" onChange={handleTypeText} />
    </div>
  );
};

export default SearchBar;

import { useState } from "react";
import { AFTER_COPY, BEFORE_COPY } from "../svg/svg";

const TextCopyButton = ({ message }: { message: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    if (!isCopied) {
      navigator.clipboard.writeText(message);
      setIsCopied((prev) => !prev);
    }
  };

  return (
    <div className="w-8 h-full flex flex-col justify-center items-center text-[0.6rem]" onClick={handleCopy}>
      {isCopied ? AFTER_COPY : BEFORE_COPY}
      {isCopied ? <p className="text-green-500">Copied</p> : <p className="text-slate-500">Copy</p>}
    </div>
  );
};

export default TextCopyButton;

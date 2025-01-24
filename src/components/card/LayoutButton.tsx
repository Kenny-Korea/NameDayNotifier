import { LayoutType } from "../../types/types";

const LayoutButton = (props: {
  children: React.ReactNode;
  type: LayoutType;
  layout: LayoutType;
  onClick: (type: LayoutType) => void;
}) => {
  const { children, type, layout, onClick } = props;
  const selected = type === layout;

  return (
    <div
      onClick={() => onClick(type)}
      className={`w-fit flex items-center justify-center gap-2 rounded-lg p-2 ${
        selected ? "shadow-inner bg-slate-200" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default LayoutButton;

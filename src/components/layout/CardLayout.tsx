import { ReactNode } from "react";

const CardLayout = (props: { children: ReactNode }) => {
  const { children } = props;
  return <div className="w-full h-full overflow-y-auto min-h-0">{children}</div>;
};

export default CardLayout;

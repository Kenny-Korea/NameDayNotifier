import { ReactNode } from "react";

const Layout = (props: { children: ReactNode }) => {
  const { children } = props;
  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-b from-gray-50 via-gray-50/95 to-gray-50/90">
      <div className="w-full h-full p-3 flex flex-col">{children}</div>
    </div>
  );
};

export default Layout;

import AGAPE_CI from "/agape-ci.png";

const Header = () => {
  return (
    <div className="w-full h-16 flex items-center justify-center bg-red-200">
      <img src={AGAPE_CI} className="w-24" />
    </div>
  );
};

export default Header;
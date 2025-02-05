import { useState } from "react";
import AGAPE_CI from "/agape-ci.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full h-16 flex items-center justify-center relative">
      <img src={AGAPE_CI} className="w-24" />
      <div className="absolute w-6 h-6 right-4 z-10">
        <label className="hamburger-button">
          <input
            type="checkbox"
            className="hidden"
            checked={isMenuOpen}
            onChange={(e) => setIsMenuOpen(e.target.checked)}
          />
          <div className="hamburger">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
        </label>
      </div>

      {/* 오버레이 */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* 슬라이딩 메뉴 */}
      <div
        className={`fixed top-0 right-0 w-1/2 h-full bg-gray-900/90 backdrop-blur-sm
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="absolute top-32 p-6 text-white">
          <ul className="space-y-4">
            <li className="hover:text-gray-300 cursor-pointer">메뉴 1</li>
            <li className="hover:text-gray-300 cursor-pointer">메뉴 2</li>
            <li className="hover:text-gray-300 cursor-pointer">메뉴 3</li>
            <li className="hover:text-gray-300 cursor-pointer">메뉴 4</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;

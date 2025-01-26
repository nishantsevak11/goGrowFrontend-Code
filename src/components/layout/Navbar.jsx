import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import MenuPage from "../../Pages/MenuPage";
import { Navigate, useNavigate } from "react-router-dom";


const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isHamburger, setIsHamburger] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsHamburger(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on component mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto lg:pt-5 px-4 py-4 flex justify-between items-center">
        <div className="logo">
          <h1 className="text-2xl lg:text-3xl font-bold">GoGlow</h1>
        </div>
        <div className="flex items-center">
          {isHamburger ? (
            <button
              className="text-white rounded-full p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          ) : (
            <div className="links flex gap-10 items-center">
              {["Features", "How It works", "About Us"].map((item, index) => (
                <a key={index} className="text-md font-semibold">
                  {item}
                </a>
              ))}
              <div
                onClick={() => <Navigate to="/profile" />}
                className="max-w-[10vw] border border-red-100 px-10 py-3"
              >
                <button onClick={() => navigate('/profile')}>
                <CgProfile/>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <MenuPage isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      )}
    </nav>
  );
};

export default Navbar;

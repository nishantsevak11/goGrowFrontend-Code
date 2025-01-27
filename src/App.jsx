import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/profile/Profile";
import { isLoggedIn } from "./services/api";
import Navbar from "./components/layout/Navbar";
import LandingPage from "./Pages/LandingPage";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useState } from "react";
import LoadingPage from "./Pages/LoadingPage";

function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  
  // Initialize Locomotive Scroll
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true
    });

    return () => scroll.destroy(); // Cleanup on unmount
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={isLoggedIn() ? <Profile /> : <Login />}
        />
        <Route
          path="/"
          element={
            isLoaded ? (
              <div className="w-full text-white ">
                <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
                <LandingPage isMenuOpen={isMenuOpen}/>
              </div>
            ) : (
              <LoadingPage setIsLoaded={setIsLoaded} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

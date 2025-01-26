// src/pages/Home.js
import Navbar from "./components/Navbar";

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar/>

      {/* Main Content */}
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-700">
          Welcome to MyApp!
        </h1>
      </div>
    </div>
  );
};

export default Home;

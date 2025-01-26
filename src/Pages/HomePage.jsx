import React from 'react'
import Navbar from '../components/layout/Navbar';

const HomePage = () => {
    return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
    {/* Navbar */}
    <Navbar/>

    {/* Hero Section */}
    <section className="bg-indigo-50 py-20" id="hero">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-indigo-600">
          Welcome to Our Landing Page
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Build your web presence with a sleek, modern, and light design.
        </p>
        <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-500">
          Learn More
        </button>
      </div>
    </section>

    {/* Features Section */}
    <section className="container mx-auto px-4 py-16" id="features">
      <h3 className="text-3xl font-bold text-center text-gray-800">
        Our Features
      </h3>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white shadow-lg p-6 rounded-lg hover:shadow-xl">
          <h4 className="text-xl font-semibold text-indigo-600">Feature 1</h4>
          <p className="mt-2 text-gray-600">
            Description of the feature goes here.
          </p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg hover:shadow-xl">
          <h4 className="text-xl font-semibold text-indigo-600">Feature 2</h4>
          <p className="mt-2 text-gray-600">
            Description of the feature goes here.
          </p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg hover:shadow-xl">
          <h4 className="text-xl font-semibold text-indigo-600">Feature 3</h4>
          <p className="mt-2 text-gray-600">
            Description of the feature goes here.
          </p>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-gray-100 py-6 mt-16">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600">© 2025 BrandName. All rights reserved.</p>
      </div>
    </footer>
  </div>
);
}

export default HomePage
import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="text-white py-16">
      {/* Top Heading Section */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">Why Choose Us?</h1>
        {/* <p className="text-lg text-gray-300">
          Building websites has never been so easy. <br />
          <span className="font-semibold">Even your grandma can!</span>
        </p> */}
      </div>

      {/* Features Grid */}
      <div className="mt-12 lg:w-1/2 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-6 lg:px-12">


        {/* Feature Card */}
        <div className="rounded-lg shadow-md p-6 text-center max-w-md mx-auto">
          <h3 className="text-2xl font-semibold mb-2">Personalized Notifications</h3>
          
          <div className="bg-gray-700 rounded-lg overflow-hidden">
            <img src="f1.avif" alt="Feature 1" className="w-full object-cover" />
          </div>
        </div>

        {/* Feature Card */}
        <div className="relative rounded-lg shadow-md p-6 text-center max-w-md mx-auto">
          <h3 className="text-2xl font-semibold mb-2">Ai Powered Insights</h3>
          
          <div className="bg-gray-700  bottom-0 rounded-lg overflow-hidden">
            <img src="f2.avif" alt="Feature 2" className="w-full" />
          </div>
        </div>

        {/* Feature Card */}
        <div className="rounded-lg shadow-md p-6 text-center max-w-md mx-auto">
          <h3 className="text-2xl font-semibold mb-2">Engaging Media</h3>
          
          <div className="rounded-lg overflow-hidden">
            <img src="f3.avif" alt="Feature 3" className="w-full" />
          </div>
        </div>

        {/* Feature Card */}
        <div className="rounded-lg shadow-md p-6 text-center max-w-md mx-auto">
          <h3 className="text-2xl font-semibold mb-2">Community Reviews</h3>
          
          <div className="rounded-lg overflow-hidden">
            <img src="f4.avif" alt="Feature 4" className="w-full object-contain h-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

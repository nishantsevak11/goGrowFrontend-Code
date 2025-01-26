import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const UserReviews = () => {
  const reviewRefs = useRef([]);

  useEffect(() => {
    // Animate each review card as it comes into view
    reviewRefs.current.forEach((ref, index) => {
      gsap.fromTo(
        ref,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref,
            start: "top center",
            end: "top center+=100",
            scrub: 1,
          },
        }
      );
    });
  }, []);

  const reviews = [
    {
      username: "Priya",
      review:
        "The daily quotes have transformed my mornings! I feel energized and ready for anything.",
    },
    {
      username: "Rahul",
      review:
        "This platform is exactly what I needed to organize my tasks and stay productive.",
    },
    {
      username: "Sara",
      review: "A simple yet powerful tool that I use daily. Highly recommended!",
    },
  ];

  return (
    <div className="w-full p-6 md:p-10">
      <h4 className="text-center text-2xl md:text-4xl font-bold mb-8">
        See What Others Are Saying
      </h4>
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center flex-wrap">
        {reviews.map((review, index) => (
          <div
            key={index}
            ref={(el) => (reviewRefs.current[index] = el)}
            className="bg-zinc-600 text-white shadow-lg rounded-2xl p-4 md:p-6 w-full md:w-[300px] lg:w-[350px] text-center"
          >
            <div className="mb-4">
              <span className="inline-block  text-white font-bold py-1 px-3 rounded-full text-sm">
                @{review.username}
              </span>
            </div>
            <p className="text-gray-700 text-white  md:text-lg italic">
              "{review.review}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import React, { useRef, useState } from "react";
import Marque from "../components/TextMarque";
import TextMarque from "../components/TextMarque";
import MenuPage from "./MenuPage";
import DemoPage from "./DemoPage";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import VideoAnimation from "../components/VideoAnimation";
import AboutSection from "../components/AboutSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorks from "../components/HowItWorks";
import UserReviews from "../components/UserReviews";

gsap.registerPlugin(ScrollTrigger);

const LandingPage = ({isMenuOpen}) => {

  const videoRef = useRef();

  useGSAP(()=>{
      gsap.to(videoRef.current, {

        scrollTrigger: {
            trigger: videoRef.current,
            start: "bottom 0",
            end: "bottom -100%",
            scrub:true,
            // markers:true
        },

        width:"80%",
        duration:2,
        delay:1
      });
  })


  // const [images, setImages] = useState([
  //   {
  //     url: "./img1.jpeg",
  //     top: "50%",
  //     left: "50%",
  //     isActive: false,
  //   },
  //   {
  //     url: "./img2.jpeg",
  //     top: "60%",
  //     left: "34%",
  //     isActive: false,
  //   },
  //   {
  //     url: "./img3.jpeg",
  //     top: "55%",
  //     left: "66%",
  //     isActive: false,
  //   },
  //   {
  //     url: "./img4.jpeg",
  //     top: "70%",
  //     left: "53%",
  //     isActive: false,
  //   },
  // ]);

  // const { scrollYProgress } = useScroll();

  // scrollYProgress.on("change", (progress) => {
  //   const scrollPercentage = progress * 100;

  //   function imagesShow(indicesToShow) {
  //     setImages((prev) =>
  //       prev.map((item, index) =>
  //         indicesToShow.includes(index)
  //           ? { ...item, isActive: true }
  //           : { ...item, isActive: false }
  //       )
  //     );
  //   }

  //   if (scrollPercentage < 5) {
  //     imagesShow([]); // No images
  //   } else if (scrollPercentage >= 5 && scrollPercentage < 10) {
  //     imagesShow([0]); // Show first image
  //   } else if (scrollPercentage >= 5 && scrollPercentage < 15) {
  //     imagesShow([0, 1]); // Show first and second images
  //   } else if (scrollPercentage >= 15 && scrollPercentage < 25) {
  //     imagesShow([0, 1, 2]); // Show first, second, and third images
  //   } else {
  //     imagesShow([0, 1, 2, 3]); // Show all images
  //   }
  // });

  return (
    <div className={`w-full pt-10 relative ${isMenuOpen ? 'overflow-hidden' : '' }`}>
      <div className="flex relative py-[5vh]">
        <div className="textstructure pt-20 lg:pt-[20vh] lg:px-20 px-5">
          {["Redefine Your", "Workday", "with us"].map((item, index) => {
            return (
              <div className="masker">
                <div className="w-fit flex items-end ">
                  {index === 1 && (
                    <motion.div
                      initial={{ width: 0 , opacity:1 }}
                      animate={{ width: "9vw" }}
                      transition={{ ease: [0.76, 0, 0.24, 1], duration:1 ,delay:0.5}}
                      className="w-[8vw] rounded-md h-[5.7vw] -top-[1vw] relative"
                    >
                      <img src="./sun.png" className="w-full mt-2 h-full object-contain " alt="" />
                    </motion.div>
                  )}
                  <h1
                    key={index}
                    className="uppercase text-[7vw] tracking-tighter leading-[6vw]"
                  >
                    {item}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>

        {/* <div className="absolute lg:right-[15%] right-[25%] bottom-[10%] w-[30%] h-full">
          {images.map(
            (elem, index) =>
              elem.isActive && (
                <img
                  key={index}
                  className="absolute w-60 rounded-lg"
                  style={{ top: elem.top, left: elem.left }}
                  src={elem.url}
                  alt="work_images"
                />
              )
          )}
        </div> */}
      </div>


      

      <VideoAnimation/>


       <AboutSection/>

       <FeaturesSection/>

       <HowItWorks/>

       <UserReviews/>

      <DemoPage/>
      <DemoPage/>
      <DemoPage/>

    
    </div>
  );
};

export default LandingPage;

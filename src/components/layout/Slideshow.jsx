import React, { useEffect, useState } from "react";
import image1 from "./awspics/image1.jpg";
import image2 from "./awspics/image2.jpg";
import image3 from "./awspics/image3.jpg";
import awss1 from "./awspics/awss1.jpg";
import awss2 from "./awspics/awss2.png";
import awss3 from "./awspics/awss3.jpg";
import awss4 from "./awspics/awss4.jpg";
import awss5 from "./awspics/awss5.png"
import awss6 from "./awspics/awss6.png"

import "./Slideshow.css";
const images = [image1, image2, image3, awss1, awss2, awss3, awss4, awss5, awss6];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
    </div>
  );
};

export default Slideshow;

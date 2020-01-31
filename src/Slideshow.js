import { Fade } from "react-slideshow-image";
import React from "react";

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: false,
  onChange: (oldIndex, newIndex) => {
    console.log(`fade transition from ${oldIndex} to ${newIndex}`);
  }
};

const Slideshow = ({ images }) => {
  return (
    <div className="slide-container">
      <Fade {...fadeProperties}>
        {images.map(path => (
          <div key={path} className="each-fade">
            <div className="image-container">
              <img src={path} alt="" />
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default Slideshow;

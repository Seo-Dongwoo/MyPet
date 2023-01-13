import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { sliderData } from "./slider-data";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide, slideInterval, autoScroll]);

  return (
    <SlideContainer>
      {sliderData.map((slide, index) => {
        return (
          <Slide key={index}>
            {index === currentSlide && (
              <>
                <LeftArrow onClick={prevSlide} />
                <RightArrow onClick={nextSlide} />
                <Image src={slide.image} alt="slide" />
              </>
            )}
          </Slide>
        );
      })}
    </SlideContainer>
  );
};

const SlideContainer = styled.div`
  position: relative;
  width: 1750px;
  height: 350px;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const LeftArrow = styled(MdKeyboardArrowLeft)`
  position: absolute;
  border-radius: 50%;
  background: transparent;
  color: rgb(220, 220, 220);
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  left: 200px;
`;

const Slide = styled.div``;

const RightArrow = styled(MdKeyboardArrowRight)`
  position: absolute;
  background: transparent;
  color: rgb(220, 220, 220);
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  right: 200px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export default Slider;

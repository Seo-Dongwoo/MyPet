import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
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
      <LeftArrow onClick={prevSlide} />
      <RightArrow onClick={nextSlide} />
      {sliderData.map((slide, index) => {
        return (
          <CurrentSlide key={index}>
            {index === currentSlide && (
              <>
                <Image src={slide.image} alt="slide" />
              </>
            )}
          </CurrentSlide>
        );
      })}
    </SlideContainer>
  );
};

const SlideContainer = styled.div`
  width: 100%;
  height: 450px;
  position: relative;
  overflow: hidden;
  background-color: var(--color-dark);
`;

const LeftArrow = styled(AiOutlineArrowLeft)`
  position: absolute;
  border: 2px solid #01bf71;
  border-radius: 50%;
  background: transparent;
  color: #01bf71;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  left: 1.5rem;
  &:hover {
    background: #fff;
  }
`;

const CurrentSlide = styled.div``;

const RightArrow = styled(AiOutlineArrowRight)`
  position: absolute;
  border: 2px solid #01bf71;
  border-radius: 50%;
  background: transparent;
  color: #01bf71;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  right: 1.5rem;
  &:hover {
    background: #fff;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 450px;
`;

export default Slider;

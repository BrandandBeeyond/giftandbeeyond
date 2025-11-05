"use client";

import React, { useEffect, useRef, useState } from "react";
import AnimatedHeading from "./AnimatedHeading";

const AnimatedBoat = ({ text, direction }) => {
  const boatRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimate(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    if (boatRef.current) observer.observe(boatRef.current);
  }, []);

  return (
    <div
      ref={boatRef}
      className={`boat flex justify-center items-center ${
        animate
          ? direction === "right"
            ? "boat-drive-right"
            : "boat-drive-left flex-row-reverse"
          : ""
      }`}
    >
      <img
        src="/images/paperboat.png"
        className={`boatimg ${animate ? "boat-float" : ""}`}
        alt=""
      />
      <AnimatedHeading text={animate ? text : ""} />
    </div>
  );
};

export default AnimatedBoat;

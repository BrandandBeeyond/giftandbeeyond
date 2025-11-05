"use client";

import React, { useEffect } from "react";

const Testimonials = () => {
  useEffect(() => {
    const section = document.querySelector(".testimonial-section");
    const plane = document.querySelector(".airplane");

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {

          plane.classList.add("fly");
          setTimeout(() => {
            section.classList.add("testimonial-show");
          }, 900);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(document.getElementById("testi"));
  }, []);


  return (
    <section className="py-20 relative">
      <img src="/images/airplane.png" className="h-24 w-auto airplane" alt="" />
      <div
        className="max-w-6xl mx-auto text-center  testimonial-section"
        id="testi"
      >
        <h2 className="text-8xl font-ralwaysmbold text-[#ffffff] headingmain mt-28">
          Testimonials
        </h2>

        <div className="grid grid-cols-2 gap-x-15 mt-30">
          <div className="greet_card rounded-tl-4xl  shadow-md p-6 text-left flex flex-col justify-end overflow-hidden relative">
            <img src="/images/giftribbon.png" className="absolute ribbon" />
          </div>
          <div className="greet_card rounded-tl-4xl  shadow-md p-6 text-left flex flex-col justify-end overflow-hidden relative">
            <img src="/images/giftribbon.png" className="absolute ribbon" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

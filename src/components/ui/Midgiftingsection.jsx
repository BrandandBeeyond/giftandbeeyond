"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Creative Designs for Every Occasion",
    description:
      "Creative design is an essential part of any successful business or organization. By following these tips, you can create designs that are both beautiful and effective.",
    img: "/images/gifting1.jpg",
  },
  {
    id: 2,
    title: "Inspiring Interior Concepts",
    description:
      "Discover innovative interior ideas that transform your spaces into elegant, comfortable, and timeless environments.",
    img: "/images/gifting2.jpg",
  },
];

const Midgiftingsection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-20 midgifting relative flex items-center bg-[#fff5ec]">
      <div className="max-w-8xl mx-auto text-center py-5 px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[activeIndex].id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-5xl leading-[60px] text-[#612c06] foglithen-font text-shadow-black text-left">
                  {slides[activeIndex].title}
                </h2>
                <p className="mt-6 text-lg text-shadow-black text-left">
                  {slides[activeIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-7 flex items-center gap-4 justify-center">
            {slides.map((slide, index) => (
              <motion.div
                key={slide.id}
                className={`relative rounded-2xl overflow-hidden transition-all duration-700 cursor-pointer ${
                  activeIndex === index
                    ? "w-2/3 h-[420px]"
                    : "w-1/3 h-[380px] opacity-70 scale-90"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <Image
                  src={slide.img}
                  alt={slide.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-3 absolute bottom-10 left-1/2 -translate-x-1/2">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              activeIndex === i ? "bg-[#612c06]" : "bg-[#c4a484]"
            }`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Midgiftingsection;

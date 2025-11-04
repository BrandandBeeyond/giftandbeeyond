"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const slides = [
  {
    title: "Gift & Beeyond",
    desc: "Your one-stop shop for all things gifting. Explore our curated collection of unique and thoughtful gifts for every occasion.",
    img: "/images/hero_image.png",
  },
  {
    title: "Handpicked Gifts",
    desc: "Discover exclusive collections that add joy to every celebration and special moment.",
    img: "/images/hero_image2.png",
  },
  {
    title: "Moments That Matter",
    desc: "We believe a gift isn’t just a product — it’s an emotion delivered beautifully.",
    img: "/images/hero_image3.png",
  },
];

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);

 
  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      3000
    );
    return () => clearInterval(interval);
  }, []);

  const slide = slides[index];
  return (
    <div className="max-w-6xl mx-auto text-center position-relative z-60">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-15 pt-52">
        <div className="text-left flex flex-col justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-6xl foglithen-font text-[#B34700] text-shadow-black">
                {slide.title}
              </h1>
              <p className="mt-6 text-lg text-shadow-black">{slide.desc}</p>


            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={slide.img}
              src={slide.img}
              alt={slide.title}
              className="w-full h-auto rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;

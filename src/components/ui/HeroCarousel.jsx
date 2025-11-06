"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const slides = [
  {
    title: "Gift & Beeyond",
    desc: "Your one-stop shop for all things gifting. Explore our curated collection of unique and thoughtful gifts for every occasion.",
    img: "/images/hero_image.png",
    bg: "/images/herobanner1.jpg",
  },
  {
    title: "Handpicked Gifts",
    desc: "Discover exclusive collections that add joy to every celebration and special moment.",
    img: "/images/hero_image2.png",
    bg: "/images/herobanner2.jpg",
  },
  {
    title: "Moments That Matter",
    desc: "We believe a gift isn’t just a product — it’s an emotion delivered beautifully.",
    img: "/images/hero_image3.png",
    bg: "/images/herobanner3.jpg",
  },
];

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  const slide = slides[index];
  const direction = index % 2 === 0 ? 1 : -1; // alternate fade up/down

  return (
    <section
      className="relative flex items-center justify-center min-h-[80vh] overflow-hidden bn_hero"
      style={{
        backgroundImage: `url(${slide.bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-15 z-10 px-6">
        {/* LEFT SIDE: Text */}
        <div className="text-left flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: direction > 0 ? -40 : 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction > 0 ? 40 : -40 }}
              transition={{ duration: 0.8 }}
            >
              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-6xl foglithen-font text-[#B34700] text-shadow-black"
              >
                {slide.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-6 text-lg text-white text-shadow-black"
              >
                {slide.desc}
              </motion.p>

              {/* Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="mt-8"
              >
                <Link
                  href="/collections"
                  className="px-6 py-3 bg-[#B34700] text-white rounded-full hover:bg-[#d65b00] transition-all duration-300"
                >
                  Explore Now
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT SIDE: Image */}
        <div className="flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={slide.img}
              src={slide.img}
              alt={slide.title}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 15,
                duration: 1.2,
              }}
              className="w-full h-auto max-w-[450px] object-contain"
              onAnimationComplete={() => {
                // optional bounce effect after image appears
              }}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;

"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

const AnimatedHeading = ({ text }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    let delay = 200;

    el.innerHTML = text
      .split("")
      .map((letter) =>
        letter === " "
          ? `<span class="wave-char">&nbsp;</span>`
          : `<span class="wave-char">${letter}</span>`
      )
      .join("");

    Array.from(el.children).forEach((span, index) => {
      setTimeout(() => {
        span.classList.add("wave-animate");
      }, index * 60 + delay);
    });
  }, [text]);

  return (
    <Link href={"/collections"}>
      <span
        ref={textRef}
        className="text-4xl text-gray-800 foglithen-font"
      ></span>
    </Link>
  );
};

export default AnimatedHeading;

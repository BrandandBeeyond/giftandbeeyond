"use client";
import React, { useEffect, useRef } from "react";

const Giftcanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const sparkles = [];
    const ribbons = [];
    const boxes = [];
    const sparkleCount = 40;
    const ribbonCount = 10;
    const boxCount = 6;

    class Sparkle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.alpha = Math.random();
        this.speed = Math.random() * 0.5 + 0.2;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,215,0,${this.alpha})`;
        ctx.fill();
      }
      update() {
        this.y -= this.speed;
        this.alpha -= 0.002;
        if (this.alpha <= 0 || this.y < 0) this.reset();
      }
    }

    class Ribbon {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 200;
        this.size = Math.random() * 15 + 10;
        this.color = ["#FFD700", "#FF69B4", "#FFB6C1", "#FFF0F5"][
          Math.floor(Math.random() * 4)
        ];
        this.speed = Math.random() * 1 + 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.02 + 0.01;
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 6, this.size, this.size / 3);
        ctx.restore();
      }
      update() {
        this.y -= this.speed;
        this.angle += this.rotationSpeed;
        if (this.y < -50) this.reset();
      }
    }

    class GiftBox {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 200;
        this.size = Math.random() * 25 + 20;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.speed = Math.random() * 0.8 + 0.3;
        this.colors = [
          "#FF6B6B",
          "#FFD93D",
          "#6BCB77",
          "#4D96FF",
          "#FF8C00",
          "#FF1493",
        ];
        this.boxColor =
          this.colors[Math.floor(Math.random() * this.colors.length)];
        this.ribbonColor = "#ffffff";
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Box base
        ctx.fillStyle = this.boxColor;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);

        // Ribbon vertical
        ctx.fillStyle = this.ribbonColor;
        ctx.fillRect(-this.size / 10, -this.size / 2, this.size / 5, this.size);

        // Ribbon horizontal
        ctx.fillRect(-this.size / 2, -this.size / 10, this.size, this.size / 5);

        ctx.restore();
      }
      update() {
        this.y -= this.speed;
        this.rotation += this.rotationSpeed;
        if (this.y < -50) this.reset();
      }
    }

    for (let i = 0; i < sparkleCount; i++) sparkles.push(new Sparkle());
    for (let i = 0; i < ribbonCount; i++) ribbons.push(new Ribbon());
    for (let i = 0; i < boxCount; i++) boxes.push(new GiftBox());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      sparkles.forEach((s) => {
        s.update();
        s.draw();
      });
      ribbons.forEach((r) => {
        r.update();
        r.draw();
      });
      boxes.forEach((b) => {
        b.update();
        b.draw();
      });
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>;
};

export default Giftcanvas;

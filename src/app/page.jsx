import Midgiftingsection from "@/components/ui/Midgiftingsection";
import Navbar from "@/components/ui/Navbar";
import Products from "@/components/ui/Products";
import Image from "next/image";

import Link from "next/link";

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="bn_theme relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="grid grid-cols-2 gap-x-15 pt-32">
            <div className="text-left flex flex-col justify-center">
              <h1 className="text-6xl foglithen-font text-[#612c06] text-shadow-black">
                Gift & Beeyond
              </h1>
              <p className="mt-6 text-lg text-shadow-black">
                Your one-stop shop for all things gifting. Explore our curated
                collection of unique and thoughtful gifts for every occasion.
              </p>

              <div className="mt-10">
                <Link
                  href="/products"
                  className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition duration-300"
                >
                  Shop Now
                </Link>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <img
                src="/images/hero_image.png"
                alt="Hero Image"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

   
        <section className="py-20  seaosonal relative">
          <img
            src="/images/playfullduck.svg"
            className="absolute playfullduck"
            alt=""
          />
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-6xl foglithen-font text-[#612c06] text-shadow-black">
              Festive Special
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-20 mt-72">
              <div className="enev relative">
                <img src="images/envelop_front.svg" className="" alt="" />
                <img
                  src="images/envelop_back.svg"
                  className="env_back absolute"
                  alt=""
                />
                <img
                  src="images/piece_of_paper.svg"
                  className="env_paper absolute"
                  alt=""
                />
              </div>
              <div className="enev relative">
                <img src="images/envelop_front.svg" className="" alt="" />
                <img
                  src="images/envelop_back.svg"
                  className="env_back absolute"
                  alt=""
                />
                <img
                  src="images/piece_of_paper.svg"
                  className="env_paper absolute"
                  alt=""
                />
              </div>
              <div className="enev relative">
                <img src="images/envelop_front.svg" className="" alt="" />
                <img
                  src="images/envelop_back.svg"
                  className="env_back absolute"
                  alt=""
                />
                <img
                  src="images/piece_of_paper.svg"
                  className="env_paper absolute"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <Products />
        </section>
     

      <section>
        <Midgiftingsection />
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-6xl foglithen-font text-[#612c06] text-shadow-black">
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
    </>
  );
};

export default Home;

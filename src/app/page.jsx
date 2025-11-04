import AnimatedHeading from "@/components/AnimatedHeading";
import HeroCarousel from "@/components/ui/HeroCarousel";
import Midgiftingsection from "@/components/ui/Midgiftingsection";
import Navbar from "@/components/ui/Navbar";
import Products from "@/components/ui/Products";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="bn_hero relative flex items-center">
        <HeroCarousel />
      </section>

      <div className="boat flex justify-center items-center">
        <img src="/images/paperboat.png" className="boatimg" alt="" />
        <AnimatedHeading text="View Collections" />
      </div>

      <section className="py-14  seaosonal relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="relative">
            <h2 className="headingmain text-8xl font-ralwaysmbold text-[#ffffff]">
              What’s The <br /> Occasion
            </h2>
            <img
              src="/images/elementfly.png"
              className="absolute playfullfly"
              alt=""
            />
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 gap-x-20 mt-30">
            <div className="">
              <img src="/images/flowergift.png" className="h-60" alt="" />
            </div>
            <div className=""></div>
            <div className="">
              <img src="/images/babyshower.png" className="h-60" alt="" />
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-x-20 mt-30">
            <div className="flex justify-center">
              <img src="/images/ring-gift.png" className="h-60" alt="" />
            </div>
            <div className=""></div>
            <div className="flex justify-center">
              <img src="/images/corporategifts.png" className="h-60" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14  seaosonal relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="relative">
            <h2 className="headingmain text-8xl font-ralwaysmbold text-[#ffffff]">
              Why <br /> Gift & Beeyond
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="para font-della text-2xl text-[#B34700] mt-10">
                <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.""Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. "Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-20">
        <Products />
      </section> */}

      <section className="py-20">
          <div className="grid grid-cols-2">
            <div></div>
            <div className="cuttedpaper"></div>
          </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-6xl foglithen-font text-[#B34700] text-shadow-black">
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

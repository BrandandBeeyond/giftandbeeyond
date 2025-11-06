import AnimatedBoat from "@/components/AnimatedBoat";
import Testimonials from "@/components/Testimonials";
import HeroCarousel from "@/components/ui/HeroCarousel";
import Navbar from "@/components/ui/Navbar";
import Products from "@/components/ui/Products";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroCarousel />

      <AnimatedBoat text="View Collections" direction="right" />

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

      <section className="py-20">
        <Products />
      </section>

      <section className="py-20">
        <div className="grid grid-cols-2">
          <div className="flex items-end justify-center">
            <AnimatedBoat text="Know more" direction="left" />
          </div>
          <div className="cuttedpaper min-h-96 flex justify-center items-center">
            <div className="relative">
              <img
                src="/images/cuttedpaper.png"
                className="cuttedpaper w-full"
                alt=""
              />
              <div className="p-20 absolute top-0 start-0">
                <div className="para font-della text-2xl text-[#B34700] mt-10 text-center">
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Amet libero ut aspernatur perferendis sit aliquid rem
                    maiores pariatur quos, delectus eius labore sed, commodi
                    quaerat! Nobis maiores voluptatum eius molestias ipsa
                    suscipit qui
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
};

export default Home;

"use client";

import AnimatedBoat from "@/components/AnimatedBoat";
import Navbar from "@/components/ui/Navbar";
import { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
    const section = document.querySelector(".mission-section");
    const plane = document.querySelector(".airplane");

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          plane.classList.add("fly");
          setTimeout(() => {
            section.classList.add("mission-show");
          }, 900);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(document.getElementById("mission"));
  }, []);

  return (
    <>
      <Navbar />

      <section className="bn_hero relative flex items-center"></section>

      <section className="py-20">
        <div className="relative">
          <AnimatedBoat text="" direction="left" />
          <div className="text-center">
            <h2 className="headingmain text-8xl font-ralwaysmbold uppercase text-[#ffffff]">
              vision
            </h2>
          </div>
        </div>

        <div className="cuttedpaper mt-10 ">
          <div className="relative">
            <img
              src="/images/cuttedpaper.png"
              className="cuttedpaper w-full object-cover"
              alt=""
            />
            <div className="p-20 absolute top-0 start-0">
              <div className="para font-della text-2xl text-[#B34700] mt-10 text-center">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet
                  libero ut aspernatur perferendis sit aliquid rem maiores
                  pariatur quos, delectus eius labore sed, commodi quaerat!
                  Nobis maiores voluptatum eius molestias ipsa suscipit qui
                  tenetur fugit error itaque aut enim asperiores iusto
                  dignissimos, dolorum commodi iste debitis porro distinctio.
                  Debitis, sit dolores! Reprehenderit autem, cum provident velit
                  magnam amet a error ducimus quod recusandae fuga asperiores
                  voluptatibus voluptates debitis quae suscipit at molestias
                  delectus libero ipsum. Quasi deleniti nulla at ratione ab,
                  quis molestiae asperiores a quaerat ducimus, ipsum repellat
                  eum perspiciatis. Qui suscipit, deserunt aut odio corrupti
                  molestiae cum autem voluptatibus eligendi possimus temporibus,
                  atque iusto incidunt perferendis totam, iste laboriosam libero
                  tempora? Animi officiis laboriosam ipsum. Et excepturi
                  necessitatibus nihil sapiente illum neque. Delectus
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <img
          src="/images/airplane.png"
          className="h-24 w-auto airplane"
          alt=""
        />

        <div
          className="max-w-6xl mx-auto text-center  mission-section"
          id="mission"
        >
          <h2 className="headingmain text-8xl font-ralwaysmbold uppercase text-[#ffffff]">
            mission
          </h2>
        </div>

        <div className="cuttedpaper mt-10 ">
          <div className="relative">
            <img
              src="/images/cuttedpaper.png"
              className="cuttedpaper w-full object-cover"
              alt=""
            />
            <div className="p-20 absolute top-0 start-0">
              <div className="para font-della text-2xl text-[#B34700] mt-10 text-center">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet
                  libero ut aspernatur perferendis sit aliquid rem maiores
                  pariatur quos, delectus eius labore sed, commodi quaerat!
                  Nobis maiores voluptatum eius molestias ipsa suscipit qui
                  tenetur fugit error itaque aut enim asperiores iusto
                  dignissimos, dolorum commodi iste debitis porro distinctio.
                  Debitis, sit dolores! Reprehenderit autem, cum provident velit
                  magnam amet a error ducimus quod recusandae fuga asperiores
                  voluptatibus voluptates debitis quae suscipit at molestias
                  delectus libero ipsum. Quasi deleniti nulla at ratione ab,
                  quis molestiae asperiores a quaerat ducimus, ipsum repellat
                  eum perspiciatis. Qui suscipit, deserunt aut odio corrupti
                  molestiae cum autem voluptatibus eligendi possimus temporibus,
                  atque iusto incidunt perferendis totam, iste laboriosam libero
                  tempora? Animi officiis laboriosam ipsum. Et excepturi
                  necessitatibus nihil sapiente illum neque. Delectus
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <img
          src="/images/elementfly.png"
          className="absolute playfullfly"
          alt=""
        />

        <div
          className="max-w-6xl mx-auto text-center  mission-section"
          id="mission"
        >
          <h2 className="headingmain text-8xl font-ralwaysmbold uppercase text-[#ffffff]">
            values
          </h2>
        </div>

        <div className="cuttedpaper mt-10 ">
          <div className="relative">
            <img
              src="/images/cuttedpaper.png"
              className="cuttedpaper w-full object-cover"
              alt=""
            />
            <div className="p-20 absolute top-0 start-0">
              <div className="para font-della text-2xl text-[#B34700] mt-10 text-center">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet
                  libero ut aspernatur perferendis sit aliquid rem maiores
                  pariatur quos, delectus eius labore sed, commodi quaerat!
                  Nobis maiores voluptatum eius molestias ipsa suscipit qui
                  tenetur fugit error itaque aut enim asperiores iusto
                  dignissimos, dolorum commodi iste debitis porro distinctio.
                  Debitis, sit dolores! Reprehenderit autem, cum provident velit
                  magnam amet a error ducimus quod recusandae fuga asperiores
                  voluptatibus voluptates debitis quae suscipit at molestias
                  delectus libero ipsum. Quasi deleniti nulla at ratione ab,
                  quis molestiae asperiores a quaerat ducimus, ipsum repellat
                  eum perspiciatis. Qui suscipit, deserunt aut odio corrupti
                  molestiae cum autem voluptatibus eligendi possimus temporibus,
                  atque iusto incidunt perferendis totam, iste laboriosam libero
                  tempora? Animi officiis laboriosam ipsum. Et excepturi
                  necessitatibus nihil sapiente illum neque. Delectus
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="headingmain text-8xl font-ralwaysmbold uppercase text-[#ffffff] text-center">
            Founders
          </h2>
          <div className="para font-della text-2xl text-[#B34700] mt-10" style={{textAlign:'justify'}}>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet
              libero ut aspernatur perferendis sit aliquid rem maiores pariatur
              quos, delectus eius labore sed, commodi quaerat! Nobis maiores
              voluptatum eius molestias ipsa suscipit qui tenetur fugit error
              itaque aut enim asperiores iusto dignissimos, dolorum commodi iste
              debitis porro distinctio. Debitis, sit dolores! Reprehenderit
              autem, cum provident velit magnam amet a error ducimus quod
              recusandae fuga asperiores voluptatibus voluptates debitis quae
              suscipit at molestias delectus libero ipsum. Quasi deleniti nulla
              at ratione ab, quis molestiae asperiores a quaerat ducimus, ipsum
              repellat eum perspiciatis. Qui suscipit, deserunt aut odio
              corrupti molestiae cum autem voluptatibus eligendi possimus
              temporibus, atque iusto incidunt perferendis totam, iste
              laboriosam libero tempora? Animi officiis laboriosam ipsum. Et
              excepturi necessitatibus nihil sapiente illum neque. Delectus
            </p>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="headingmain text-8xl font-ralwaysmbold capitalize text-[#ffffff] text-center">
            Why <br /> choose Us
          </h2>
          <div className="para font-della text-2xl text-[#B34700] mt-10" style={{textAlign:'justify'}}>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet
              libero ut aspernatur perferendis sit aliquid rem maiores pariatur
              quos, delectus eius labore sed, commodi quaerat! Nobis maiores
              voluptatum eius molestias ipsa suscipit qui tenetur fugit error
              itaque aut enim asperiores iusto dignissimos, dolorum commodi iste
              debitis porro distinctio. Debitis, sit dolores! Reprehenderit
              autem, cum provident velit magnam amet a error ducimus quod
              recusandae fuga asperiores voluptatibus voluptates debitis quae
              suscipit at molestias delectus libero ipsum. Quasi deleniti nulla
              at ratione ab, quis molestiae asperiores a quaerat ducimus, ipsum
              repellat eum perspiciatis. Qui suscipit, deserunt aut odio
              corrupti molestiae cum autem voluptatibus eligendi possimus
              temporibus, atque iusto incidunt perferendis totam, iste
              laboriosam libero tempora? Animi officiis laboriosam ipsum. Et
              excepturi necessitatibus nihil sapiente illum neque. Delectus
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;

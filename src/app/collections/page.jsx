import Navbar from "@/components/ui/Navbar";

const CollectionPage = () => {
  return (
    <>
      <Navbar />
      <section className="bn_hero relative flex items-center"></section>

      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="headingmain text-8xl font-della capitalize text-[#ffffff] text-center">
            Limited Edition
          </h2>
        </div>
      </section>
    </>
  );
};

export default CollectionPage;

import Navbar from "@/components/ui/Navbar";

import Link from "next/link";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="sec_banner relative flex items-center justify-center">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl sm:text-5xl text-slate-800 uppercase">
            Hello, Welcome to Gift & Beeyond !
          </h1>
          <div className="mt-15 flex justify-center">
            <Link href={"/orders"}>
              <img src="/images/buttonshape.png" className="w-90" alt="" />
            </Link>
          </div>
        </div>
      </div>

      <section className="my-32">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-6xl foglithen-font text-shadow-black">
            Festive Special
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 mt-30">
            <div className="rounded-3xl giftbox  bg-red-400 h-70 w-full relative transition-transform duration-300 hover:-translate-y-[50px]">
              <svg
                className="svggift"
                width="476"
                height="184"
                viewBox="0 0 476 184"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M122.284 14.8423C59.2942 52.8739 171.409 154.293 228.061 176.479C392.075 123.234 386.063 32.6754 355.825 14.8423C286.298 -26.1618 247.671 103.98 237.569 165.782C209.52 11.7522 135.12 -4.17417 122.284 14.8423Z"
                  stroke="oklch(70.4% 0.191 22.216)"
                  stroke-width="13"
                  stroke-linecap="round"
                />
                <path
                  d="M7 119.972C32.5528 111.85 93.9985 105.829 135.358 146.713C155.761 161.57 204.886 187.598 238.164 172.86"
                  stroke="oklch(70.4% 0.191 22.216)"
                  stroke-width="13"
                  stroke-linecap="round"
                />
                <path
                  d="M468.734 119.972C443.181 111.85 381.735 105.829 340.375 146.713C319.973 161.57 270.848 187.598 237.57 172.86"
                  stroke="oklch(70.4% 0.191 22.216)"
                  stroke-width="13"
                  stroke-linecap="round"
                />
              </svg>

              <img src="/images/gifting_opens.webp" className="giftbox_open_ani" alt="" />
            </div>
            <div className="rounded-3xl giftbox bg-yellow-200 h-70 w-full relative transition-transform duration-300 hover:-translate-y-[50px]">
              <svg
                className="svggift"
                width="476"
                height="184"
                viewBox="0 0 476 184"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M122.284 14.8423C59.2942 52.8739 171.409 154.293 228.061 176.479C392.075 123.234 386.063 32.6754 355.825 14.8423C286.298 -26.1618 247.671 103.98 237.569 165.782C209.52 11.7522 135.12 -4.17417 122.284 14.8423Z"
                  stroke="#FF0000"
                  stroke-width="13"
                  stroke-linecap="round"
                />
                <path
                  d="M7 119.972C32.5528 111.85 93.9985 105.829 135.358 146.713C155.761 161.57 204.886 187.598 238.164 172.86"
                  stroke="#FF4242"
                  stroke-width="13"
                  stroke-linecap="round"
                />
                <path
                  d="M468.734 119.972C443.181 111.85 381.735 105.829 340.375 146.713C319.973 161.57 270.848 187.598 237.57 172.86"
                  stroke="#FF4242"
                  stroke-width="13"
                  stroke-linecap="round"
                />
              </svg>
                <img src="/images/gifting_opens.webp" className="giftbox_open_ani" alt="" />
            </div>
            <div className="rounded-3xl giftbox bg-blue-300 h-70 w-full relative transition-transform duration-300 hover:-translate-y-[50px]">
              <svg
                className="svggift"
                width="476"
                height="184"
                viewBox="0 0 476 184"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M122.284 14.8423C59.2942 52.8739 171.409 154.293 228.061 176.479C392.075 123.234 386.063 32.6754 355.825 14.8423C286.298 -26.1618 247.671 103.98 237.569 165.782C209.52 11.7522 135.12 -4.17417 122.284 14.8423Z"
                  stroke="#FF0000"
                  stroke-width="13"
                  stroke-linecap="round"
                />
                <path
                  d="M7 119.972C32.5528 111.85 93.9985 105.829 135.358 146.713C155.761 161.57 204.886 187.598 238.164 172.86"
                  stroke="#FF4242"
                  stroke-width="13"
                  stroke-linecap="round"
                />
                <path
                  d="M468.734 119.972C443.181 111.85 381.735 105.829 340.375 146.713C319.973 161.57 270.848 187.598 237.57 172.86"
                  stroke="#FF4242"
                  stroke-width="13"
                  stroke-linecap="round"
                />
              </svg>
                <img src="/images/gifting_opens.webp" className="giftbox_open_ani" alt="" />
            </div>
            <div className="rounded-3xl giftbox bg-orange-300 h-70 w-full relative transition-transform duration-300 hover:-translate-y-[50px]">
              <svg
                className="svggift"
                width="476"
                height="184"
                viewBox="0 0 476 184"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M122.284 14.8423C59.2942 52.8739 171.409 154.293 228.061 176.479C392.075 123.234 386.063 32.6754 355.825 14.8423C286.298 -26.1618 247.671 103.98 237.569 165.782C209.52 11.7522 135.12 -4.17417 122.284 14.8423Z"
                  stroke="#FF0000"
                  stroke-width="13"
                  stroke-linecap="round"
                />
                <path
                  d="M7 119.972C32.5528 111.85 93.9985 105.829 135.358 146.713C155.761 161.57 204.886 187.598 238.164 172.86"
                  stroke="#FF4242"
                  stroke-width="13"
                  stroke-linecap="round"
                />
                <path
                  d="M468.734 119.972C443.181 111.85 381.735 105.829 340.375 146.713C319.973 161.57 270.848 187.598 237.57 172.86"
                  stroke="#FF4242"
                  stroke-width="13"
                  stroke-linecap="round"
                />
              </svg>
                <img src="/images/gifting_opens.webp" className="giftbox_open_ani" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

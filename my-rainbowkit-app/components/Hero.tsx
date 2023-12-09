import Image from "next/image";

function Hero() {
  return (
    <div className="justify-center items-center bg-zinc-800 flex w-full flex-col px-16 py-12 max-md:max-w-full max-md:px-5">
      <div className="w-[1050px] max-w-full my-8">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
            <div className="items-start flex grow flex-col max-md:max-w-full max-md:mt-8">
              <div className="justify-center text-white text-7xl font-semibold leading-[74px] capitalize self-stretch max-md:max-w-full max-md:text-4xl max-md:leading-[49px]">
                Discover digital art & Collect NFTs
              </div>
              <div className="self-stretch text-white text-2xl leading-9 capitalize mt-5 max-md:max-w-full">
                NFT marketplace UI created with Anima for Figma. Collect, buy
                and sell art from more than 20k NFT artists.
              </div>
              <div className="justify-center bg-purple-500 flex gap-3 mt-8 px-12 py-5 rounded-3xl self-start items-start max-md:px-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4de93ac9f3ba29ae6199e238626534aa78e00b7f2a66b2fe530d074459265d69?"
                  className="aspect-square object-contain object-center w-5 overflow-hidden shrink-0 max-w-full"
                />
                <div className="text-white text-center text-base font-semibold leading-6 self-stretch grow whitespace-nowrap">
                  Get Started
                </div>
              </div>
              <div className="items-stretch self-stretch flex justify-between gap-5 mt-8 rounded-3xl max-md:max-w-full max-md:flex-wrap max-md:justify-center">
                <div className="items-stretch flex grow basis-[0%] flex-col rounded-3xl">
                  <div className="text-white text-3xl font-bold leading-10 capitalize">
                    240k+{" "}
                  </div>
                  <div className="text-white text-2xl leading-10 capitalize">
                    Total Sale
                  </div>
                </div>
                <div className="items-stretch flex grow basis-[0%] flex-col rounded-3xl">
                  <div className="text-white text-3xl font-bold leading-10 capitalize">
                    100k+
                  </div>
                  <div className="text-white text-2xl leading-10 capitalize">
                    Auctions
                  </div>
                </div>
                <div className="items-stretch flex grow basis-[0%] flex-col rounded-3xl">
                  <div className="text-white text-3xl font-bold leading-10 capitalize">
                    240k+
                  </div>
                  <div className="text-white text-2xl leading-10 capitalize">
                    Artists
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
            <div className="items-stretch flex flex-col max-md:max-w-full max-md:mt-8">
              <Image
                loading="lazy"
                src="/a8183bdafc4bd1791fe9082c5c58b135.png"
                alt="NFT Marketplace"
                width={100}
                height={100}
                className="aspect-[1.27] object-fit object-center w-full overflow-hidden max-md:max-w-full"
              />
              <div className="justify-center items-stretch bg-neutral-700 flex flex-col px-5 py-6 rounded-none max-md:max-w-full">
                <div className="text-white text-2xl font-semibold leading-8 capitalize max-md:max-w-full">
                  Space Walking
                </div>
                <div className="items-stretch flex justify-between gap-3 mt-2.5 rounded-3xl max-md:max-w-full max-md:flex-wrap">
                  <Image
                    loading="lazy"
                    width={100}
                    height={100}
                    alt="icon"
                    src="/d79c0afb936279fe8427b823bc6218b6.png"
                    className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full"
                  />
                  <div className="text-white text-base leading-6 grow shrink basis-auto self-start max-md:max-w-full">
                    Animakid
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

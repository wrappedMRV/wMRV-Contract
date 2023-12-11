import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
const NavBar = () => {
  return (
    <div className="shadow-sm bg-neutral-900 flex w-full items-stretch justify-between gap-5 pl-16 pr-20 py-6 max-md:max-w-full max-md:flex-wrap max-md:px-5">
      <div className="justify-between items-stretch flex gap-3">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4449e1f739e96d31b643a3d52bf58dd65295e0cc6d750bf100da093b3f31f6a2?"
          className="aspect-[0.71] object-contain object-center w-8 overflow-hidden shrink-0 max-w-full"
        />
        <div className="text-white text-2xl font-bold leading-5 self-center grow whitespace-nowrap my-auto">
          <Link href="/">Verified MRV</Link>
        </div>
      </div>
      <div className="items-start flex justify-between gap-4 mt-1.5 pr-2 self-start max-md:max-w-full max-md:flex-wrap max-md:justify-center">
        <div className="items-stretch self-stretch flex justify-between gap-4 p-2">
          <div className="text-white text-sm font-semibold leading-6 px-2 whitespace-nowrap">
          <Link href="/wrapcarboncredit">  Wrap Carbon Credits</Link>
          </div>
          <div className="text-white text-sm font-semibold leading-6 whitespace-nowrap">
            <Link href="/portfolio">Portfolio</Link>
          </div>
        </div>
        <div className="text-white text-sm font-bold leading-6 whitespace-nowrap justify-center items-stretch self-stretch grow px-8 rounded-xl max-md:px-5">
          <ConnectButton />
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/28cfe3f405faab485fdcecc3985119ae8e9d6da0f4748c602ea6d0d7aef81043?"
          className="aspect-[0.96] object-contain object-center w-[23px] overflow-hidden self-center shrink-0 max-w-full my-auto"
        />
      </div>
    </div>
  );
};

export default NavBar;

import React from "react";
import Image from "next/image";
type CardComponentProps = {
  imageUrl: string;
  title: string;
};

const PortfolioCard: React.FC<CardComponentProps> = ({ imageUrl, title }) => {
  return (
    <div className="flex flex-col items-stretch w-2/3 md:w-full md:ml-0">
      <div className="bg-neutral-900 flex flex-col w-full grow mx-auto pb-6 rounded-xl md:mt-10">
        <div className="bg-gray-800 flex h-[450px] shrink-0 flex-col items-start">
          {/* Dynamic image here */}
          <Image
            src={imageUrl}
            alt={title}
            width={100}
            height={100}
            style={{ objectFit: "cover", objectPosition: "50%" }}
            className="w-full h-full object-cover rounded-t-xl"
          />
        </div>
        <div className="flex justify-between items-center self-center w-full px-4 mt-6">
          {/* Static verified badge */}
          <div className="flex items-center">
            <span className="text-slate-500 text-sm">Verified Toucans</span>
            <Image
              src="/checkicon.svg"
              alt="Verified"
              height={20}
              width={20}
              className="ml-2"
              quality={80}
            />
          </div>
          {/* Additional icon, static */}
          <Image
            src="/poligonicon.svg"
            alt="Additional Info"
            height={20}
            width={20}
            className="w-6 h-6"
          />
        </div>
        <div className="text-white text-lg font-semibold leading-7 self-center mt-2">
          {/* Dynamic title here */}
          {title}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;

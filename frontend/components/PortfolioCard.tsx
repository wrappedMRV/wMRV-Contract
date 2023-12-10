import React from "react";
import Image from "next/image";
type CardComponentProps = {
  imageUrl: string;
  title: string;
};

const PortfolioCard: React.FC<CardComponentProps> = ({ imageUrl, title }) => {
  return (
    <div className="flex flex-col items-stretch md:w-full">
  <div className="bg-neutral-900 flex flex-col w-full max-w-lg mx-auto py-4 rounded-xl md:my-5">
    <div className="bg-gray-800 flex flex-col items-start">
      {/* Dynamic image here */}
      <Image
        priority
        src={imageUrl}
        alt={title}
        width={100}
        height={56} // This maintains a 16:9 aspect ratio
        className="w-full object-cover rounded-t-xl"
        style={{ objectFit: "cover" }}
        quality={75}
      />
    </div>
    <div className="flex justify-between items-center px-4 mt-4">
      {/* Static verified badge */}
      <div className="flex items-center">
        <span className="text-slate-500 text-sm">Verified Toucans</span>
        <Image
         priority
          src="/checkicon.svg"
          alt="Verified"
          height={20}
          width={20}
          className="ml-2"
          quality={75}
        />
      </div>
      {/* Additional icon, static */}
      <Image
      loading="lazy"
        src="/poligonicon.svg"
        alt="Additional Info"
        height={20}
        width={20}
        className="w-6 h-6"
      />
    </div>
    <div className="text-white text-lg font-semibold leading-7 mt-2 px-4">
      {/* Dynamic title here */}
      {title}
    </div>
  </div>
</div>

  );
};

export default PortfolioCard;

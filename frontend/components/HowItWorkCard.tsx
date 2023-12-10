import React from "react";
import Image from "next/image";
type HowItWorkCardProps = {
  imageUrl: string;
  title: string;
  text: string;
};

const HowItWorkCard: React.FC<HowItWorkCardProps> = ({
  imageUrl,
  title,
  text,
}) => {
  return (
    <div className="md:max-w-full rounded-xl overflow-hidden shadow-lg text-center p-6 bg-neutral-700 m-4">
      <div className="rounded-full mb-4 overflow-hidden w-auto h-auto p-2">
        <Image
          src={imageUrl}
          alt={title}
          height={100}
          width={100}
          className="w-full h-full"
          style={{ objectFit: "cover" }}
        />
      </div>
      <h2 className="text-lg text-white font-bold mb-2">{title}</h2>
      <p className="text-white text-base">{text}</p>
    </div>
  );
};

export default HowItWorkCard;

import React from "react";

// Define types for the component's props
type CarbonWrapperCardProps = {
  title: string;
  imageUrl: string;
  onWrap: () => void;
  onUnwrap: () => void;
  steps: string[];
  price: number;
  marketFee: number;
  carbonRewardFee: number;
  currency: string;
};

const CarbonWrapperCard: React.FC<CarbonWrapperCardProps> = ({
  title,
  imageUrl,
  onWrap,
  onUnwrap,
  steps,
  price,
  marketFee,
  carbonRewardFee,
  currency,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <img
          src={imageUrl}
          alt="Carbon Credit"
          className="w-full h-64 object-cover"
        />
        <div className="flex justify-between my-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onWrap}
          >
            Wrap Carbon
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded"
            onClick={onUnwrap}
          >
            Unwrap
          </button>
        </div>
        <ol className="list-decimal list-inside">
          {steps.map((step, index) => (
            <li key={index} className="my-1">
              {step}
            </li>
          ))}
        </ol>
      </div>
      <div className="bg-gray-100 p-5">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold">Price</p>
            <p>
              {price} {currency}
            </p>
          </div>
          <div>
            <p>Marketplace Fee ({marketFee}%)</p>
            <p>Carbon Steward Fee ({carbonRewardFee}%)</p>
          </div>
          <div>
            <p>Total</p>
            <p>
              {(price + (price * (marketFee + carbonRewardFee)) / 100).toFixed(
                2,
              )}{" "}
              {currency}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonWrapperCard;

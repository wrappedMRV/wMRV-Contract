
import React from 'react';
import Header from '../../components/Header';
import ImageComponent from '../../components/ImageComponent'
import CarbonAssetCard from '@/components/CarbonAssetCard';

interface StatisticProps {
  title: string;
  value: string;
  prefix?: string;
}

// StatisticRow component displays a row of statistics along with a "View" button
const StatisticRow: React.FC = () => (
  <div className="flex justify-between items-center bg-neutral-800 p-4 rounded-md">
    <div className="text-white">Aetelas dETF</div>
    <div className="text-white">$ 5,492,202.50</div>
    <div className="text-white">0%</div>
    <div className="text-white">N/A</div>
    <button className="text-teal-500">View</button>
  </div>
);

// Card component wraps the StatisticRow and adds a "View All" button at the bottom
const Card: React.FC = () => (
  <div className="bg-neutral-900 p-6 rounded-xl w-full  mx-auto">
    <div className="flex justify-between text-sm mb-2 px-4">
      <div className="text-zinc-400">Aetelas dETF</div>
      <div className="text-zinc-400">Liquidity</div>
      <div className="text-zinc-400">My TVL</div>
      <div className="text-zinc-400">Unlock date</div>
      <div></div> {/* Empty div for aligning with the row having the "View" button */}
    </div>
    <StatisticRow />
    <div className="flex justify-center">

    <button className="text-teal-500 mt-4">View All</button>
    </div>
  </div>
);


const Dashboard: React.FC = () => (
  <div className="bg-zinc-900 flex flex-col items-center">
    <div className="flex bg-zinc-800 w-full flex-col m-20 p-5 items-start">
      <Header title="My Carbon Asset" className="text-lg leading-7 mt-20 p-5" />
        <CarbonAssetCard />
      <Header title="Carbon dETFs Liquidity Positions" className="text-lg leading-7 mt-20 p-5" />
      {/* Pool Token Details */}
       <Card />
      {/* Pending TCO2 Wrappers */}
      <Header title="Pending TCO2 Wrappers" className="text-lg leading-7 mt-14 p-5" />
      <div className="items-stretch bg-neutral-900 flex flex-col mt-8 p-6 rounded-2xl w-full">
        <div className="items-center bg-gray-900 flex flex-col px-4 py-7 rounded-xl">
          <ImageComponent
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/19373cb2513406104eb572c4e6620a36fdfd38649c693c94c51904ba0dbdd1fc?apiKey=e3802405984e420cb725bf0a04130d05&"
            alt="TCO2 Wrappers"
            className="aspect-[1.09] object-contain object-center w-[70px] overflow-hidden max-w-full"
          />
          <Header title="You have no pending TCO2 Wrappers" className="text-2xl font-bold leading-9 mt-4" />
          <div className="text-slate-400 text-lg leading-7 mt-2">
            Wrapping tokens takes 24 hours.
          </div>
        </div>
      </div>

      {/* Retired Carbon Credits */}
      <Header title="Retired Carbon Credits" className="text-lg leading-7 mt-14 p-5" />
      <div className="items-stretch bg-neutral-900 flex flex-col mt-8 p-6 pt-6 pb-3.5 rounded-2xl w-full">
        <div className="items-center bg-gray-900 flex flex-col pt-6 pb-12 px-16 rounded-xl">
          <ImageComponent
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a3bba3606bd5405e439d7a06b0b18c4f9bef7941236d1b642ce371ef001e5911?apiKey=e3802405984e420cb725bf0a04130d05&"
            alt="Retired Carbon Credits"
            className="aspect-square object-contain object-center w-16 overflow-hidden max-w-full mb-12"
          />
        </div>
      </div>
    </div>
    <div className="bg-zinc-800 flex w-full flex-col items-center px-20 py-11">
      <Header title="You have no pending Retired Carbon Credits" className="text-2xl leading-9" />
      <div className="text-slate-400 text-lg leading-7 mt-2">
        Retire your Wrapped Tokens to offset your emissions.
      </div>
    </div>
  </div>
);

export default Dashboard;
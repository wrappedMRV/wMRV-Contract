"use client"
import React from 'react';
import Header from '@/components/Header';
import ImageComponent from '@/components/ImageComponent'
import CarbonAssetCard from '@/components/CarbonAssetCard';
import { useEffect, useState } from 'react';
import SelectElem  from '@/components/SelectElem'
import { SelectElemProps } from '@/components/SelectElem';

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
const cardData =  [
  {
    "id": 1,
    "afforestation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "rally": "Phasellus vitae purus lectus, sit amet rutrum nunc.",
    "ratingMethodology": "Sed ac orci ac lectus convallis fringilla.",
    "wrap": "Nulla facilisi. Maecenas lobortis tellus eget nisi vestibulum fermentum.",
    "redis": "Morbi et nibh non diam mollis scelerisque vitae ac mi."
  },
  {
    "id": 2,
    "afforestation": "Donec rutrum magna in est vestibulum, vel lacinia felis elementum.",
    "rally": "Fusce vitae nulla in quam consectetur eleifend.",
    "ratingMethodology": "In hac habitasse platea dictumst. Morbi nec orci ornare, eleifend orci vitae, bibendum massa.",
    "wrap": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec quam felis, tristique sed aliquam ut, eleifend ut augue.",
    "redis": "Vivamus fermentum tortor eu lacus tristique, sit amet malesuada felis ultrices."
  },
  {
    "id": 3,
    "afforestation": "Vivamus sit amet massa a quam pretium sodales. Cras ut lorem a tellus iaculis porta.",
    "rally": "Cras ac orci quis felis tincidunt ultricies.",
    "ratingMethodology": "Sed ac nulla in arcu sodales blandit. Phasellus non laoreet enim.",
    "wrap": "Proin nec diam vel magna consectetur luctus.",
    "redis": "Maecenas velit tellus, tincidunt eu mauris at, porta ultrices enim."
  },
  {
    "id": 4,
    "afforestation": "Suspendisse potenti risus, tincidunt at ultricies vitae, malesuada a leo.",
    "rally": "Pellentesque a nisl quis elit venenatis pulvinar.",
    "ratingMethodology": "Integer et quam at sapien ultrices posuere at et turpis.",
    "wrap": "Nulla facilisi. Proin laoreet libero sit amet nulla pretium, ac faucibus lectus gravida.",
    "redis": "Nullam aliquet, sem sit amet facilisis accumsan, orci nisl feugiat purus, eu tincidunt ligula ligula ut lacus."
  },
  {
    "id": 5,
    "afforestation": "Nunc viverra elit sed velit mattis, at accumsan eros hendrerit. Fusce in ante vitae quam pulvinar fermentum.",
    "rally": "Nunc euismod, magna eget aliquam scelerisque, dui orci blandit erat, id ultricies ipsum turpis ac mauris.",
    "ratingMethodology": "Donec sit amet dolor lacinia, tincidunt arcu eu, mattis nulla.",
    "wrap": "Nulla a ligula quis nisi congue posuere.",
    "redis": "Nullam sit amet leo in nibh ornare tristique eget nec augue."
  }
] ;
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


const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/bezero');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                setData(json);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
     console.log(JSON.stringify(data, null, 2))
  return (
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
  )
};

export default Dashboard;
import { ChangeEvent, useEffect, useState } from 'react';

import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { useSendTransaction, usePrepareSendTransaction } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { parseEther } from 'ethers/lib/utils.js';
import Image from 'next/image'
import  Hero  from './Hero';
import Footer from './Footer';
export default function Dapp() {
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [transferAmount, setTransferAmout] = useState<string>("0");
  const addRecentTransaction = useAddRecentTransaction();


  const onRecipientAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReceiverAddress(e.target.value);
  }

  const onTransferAmountChange = ( e: ChangeEvent<HTMLInputElement>) => {
    setTransferAmout(e.target.value);
  }

  const { config, error } = usePrepareSendTransaction({
    request: {
      to: receiverAddress,
      value: parseEther(transferAmount || '0'),
    }
  });

  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction(config)

  const handleSendTransaction = async () => {
    sendTransaction?.();
  }

  useEffect(() => {
    if (isSuccess) {
      addRecentTransaction({
        hash: data?.hash || "",
        description: "Send Transaction",
      });
    }
  }, [data, isSuccess])

  return (
    <div className="bg-zinc-900 h-auto flex justify-center items-center">
     <div className="items-stretch w-full">
    <Hero/>
      <div className="items-center bg-zinc-800 z-[1] flex w-full flex-col justify-center px-16 py-11 max-md:max-w-full max-md:px-5">
        <div className="flex w-[1050px] max-w-full flex-col mb-8">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/89e596cfc744bee7202e628d3b1d8bec9cf0bbf697158603115fb02410ff8246?"
            className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden max-w-full ml-12 self-start max-md:ml-2.5"
          />
          <div className="text-white text-4xl font-semibold leading-10 capitalize self-stretch mt-5 max-md:max-w-full">
            How it works
          </div>
          <div className="text-white text-2xl leading-9 capitalize self-stretch mt-2.5 max-md:max-w-full">
            Find out how to get started
          </div>
          <div className="self-stretch mt-12 max-md:max-w-full max-md:mt-10">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
                <div className="items-center bg-neutral-700 flex grow flex-col w-full pt-2.5 pb-8 px-8 rounded-3xl max-md:mt-8 max-md:px-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d9ab3da590d297808b8cdbc4208ed56172660e2963f21397b1d27029522ed4c?"
                    className="aspect-square object-contain object-center w-full overflow-hidden"
                  />
                  <div className="self-stretch text-white text-center text-2xl font-semibold leading-8 capitalize mt-5">
                    Setup Your wallet
                  </div>
                  <div className="self-stretch text-white text-center text-base leading-6 mt-2.5">
                    Set up your wallet of choice. Connect it to the Animarket by
                    clicking the wallet icon in the top right corner.
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                <div className="items-center self-stretch bg-neutral-700 flex grow flex-col w-full pt-2.5 pb-12 px-8 rounded-3xl max-md:mt-8 max-md:px-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e1d8957d966a30a52f3659788f167899091cd3ca6d18198e32187cdb9ac42f7c?"
                    className="aspect-square object-contain object-center w-full overflow-hidden"
                  />
                  <div className="self-stretch text-white text-center text-2xl font-semibold leading-8 capitalize mt-5">
                    Create Collection
                  </div>
                  <div className="self-stretch text-white text-center text-base leading-6 mt-2.5">
                    Upload your work and setup your collection. Add a
                    description, social links and floor price.
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                <div className="items-center self-stretch bg-neutral-700 flex grow flex-col w-full pt-2.5 pb-8 px-8 rounded-3xl max-md:mt-8 max-md:px-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e0c618656d105c701598fe4c68a4de85447ac00cb7ed0043ff44544ed99c54e?"
                    className="aspect-square object-contain object-center w-full overflow-hidden"
                  />
                  <div className="self-stretch text-white text-center text-2xl font-semibold leading-8 capitalize mt-5">
                    Start Earning
                  </div>
                  <div className="self-stretch text-white text-center text-base leading-6 mt-2.5">
                    Choose between auctions and fixed-price listings. Start
                    earning by selling your NFTs or trading others.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

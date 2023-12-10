import { ChangeEvent, useEffect, useState } from "react";

import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { useSendTransaction, usePrepareSendTransaction } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { parseEther } from "ethers";
import Image from "next/image";
import Hero from "@../../../components/Hero";
import Footer from "@/../../components/Footer";
import HowItWorkCard from "@/../../components/HowItWorkCard";
import FAQCard from "@/../../components/FaqCard";
export default function Dapp() {
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [transferAmount, setTransferAmout] = useState<string>("0");
  const addRecentTransaction = useAddRecentTransaction();

  const onRecipientAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReceiverAddress(e.target.value);
  };

  const onTransferAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTransferAmout(e.target.value);
  };

  const { config, error } = usePrepareSendTransaction({
    to: receiverAddress,
    value: parseEther(transferAmount || "0"),
  });

  const { data, isLoading, isSuccess, sendTransaction } =
    useSendTransaction(config);

  const handleSendTransaction = async () => {
    sendTransaction?.();
  };

  useEffect(() => {
    if (isSuccess) {
      addRecentTransaction({
        hash: data?.hash || "",
        description: "Send Transaction",
      });
    }
  }, [data, isSuccess]);

  return (
    <div className="bg-[#141414] h-auto flex justify-center items-center">
      <div className="items-stretch w-full">
        <Hero />
        <div className="items-center bg-zinc-800 z-[1] flex w-full flex-col justify-center px-16 py-11 max-md:max-w-full max-md:px-5">
          <div className="flex w-[1050px] max-w-full flex-col mb-8">
            <div className="text-white text-4xl font-semibold leading-10 capitalize self-stretch mt-5 max-md:max-w-full">
             <h3 className="px-4">How it works</h3>
            </div>
            <div className="text-white text-2xl leading-9 capitalize self-stretch mt-2.5 max-md:max-w-full">
             <h4 className="px-4">Find out how to get started</h4>
            </div>
            <div className="self-stretch mt-12 max-md:max-w-full max-md:mt-10">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
               
                <HowItWorkCard
                  imageUrl="/howitwork1.svg"
                  title="Setup Your Wallet"
                  text="Set up your wallet of choice. Connect it to the Animarket
                      by clicking the wallet icon in the top right corner."
                />
                <HowItWorkCard
                  imageUrl="/howitwork2.svg"
                  title="Create Collection"
                  text="Upload your work and setup your collection. Add a
                      description, social links and floor price."
                /> 
                <HowItWorkCard
                imageUrl="/howitwork3.svg"
                title="Start Earning"
                text="Choose between auctions and fixed-price listings. Start
                earning by selling your NFTs or trading others."
              />
              </div>
            </div>
          </div>
        </div>
        <div className="items-center bg-zinc-800 z-[1] flex w-full flex-col justify-center px-16 py-11 max-md:max-w-full max-md:px-5">
          <div className="flex w-[1050px] max-w-full flex-col mb-8">
            <div className="text-white text-4xl font-semibold leading-10 capitalize self-stretch mt-5 max-md:max-w-full">
             <h3 className="px-4">How it works</h3>
            </div>
            <div className="text-white text-2xl leading-9 capitalize self-stretch mt-2.5 max-md:max-w-full">
             <h4 className="px-4">Find out how to get started</h4>
            </div>
            <div className="self-stretch mt-12 max-md:max-w-full max-md:mt-10">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
               
                <HowItWorkCard
                  imageUrl="/howitwork1.svg"
                  title="Setup Your Wallet"
                  text="Set up your wallet of choice. Connect it to the Animarket
                      by clicking the wallet icon in the top right corner."
                />
                <HowItWorkCard
                  imageUrl="/howitwork2.svg"
                  title="Create Collection"
                  text="Upload your work and setup your collection. Add a
                      description, social links and floor price."
                /> 
                <HowItWorkCard
                imageUrl="/howitwork3.svg"
                title="Start Earning"
                text="Choose between auctions and fixed-price listings. Start
                earning by selling your NFTs or trading others."
              />
              </div>
            </div>
          </div>
          <div className="items-center bg-zinc-800 z-[1] flex w-full flex-col justify-center px-16 py-11 max-md:max-w-full max-md:px-5">
    <div className="flex w-[1050px] max-w-full flex-col mb-8">
      {/* FAQ Section */}
      <div className="text-white text-4xl font-semibold leading-10 capitalize self-stretch mt-5 max-md:max-w-full">
        <h3 className="px-4">Frequently Asked Questions</h3>
      </div>
      <div className="self-stretch mt-12 max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex flex-col max-md:flex-col max-md:items-stretch max-md:gap-0">
          {/* Example FAQ Card */}
          <FAQCard
            title="What does wrapping my carbon credits involve?"
            text="Wrapping your carbon credits converts them into tokens usable in the ReFi sphere, all backed by our Verified MRV system to ensure their validity and ecological value. This process aligns your assets with sustainability goals, preparing them for participation in the broader environmental impact landscape."
          />
          <FAQCard
            title="How can I use my wrapped carbon credits in ReFi protocols?"
            text="Your wrapped carbon credits can be utilized within various ReFi protocols that we have verified and partnered with. These protocols are committed to environmental integrity and support projects that aim for ecological restoration and sustainable progress."
          />
          <FAQCard
            title="How does wallet synchronization work?"
            text="Wrapping your carbon credits prepares them for use in ReFi projects by certifying their impact and compliance with Verified MRV standards. This step is essential in transforming your credits into tools for funding regenerative and sustainable projects, even without real-time data."
          />
          <FAQCard
            title="What is the purpose of wrapping carbon credits for ReFi?"
            text="Engage with confidence in the ReFi domain using your wrapped carbon credits to support Verified MRV-approved environmental initiatives. Through this engagement, you contribute to a network of projects that drive sustainable development and ecological restoration, backed by periodic data verification."
          />
          {/* Add more FAQ Cards as needed */}
        </div>
      </div>
    </div>
  </div>
        </div>
      </div>
    </div>
  );
}

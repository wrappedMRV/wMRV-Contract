"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import { ApolloClient, InMemoryCache, useQuery, gql } from "@apollo/client";
import PortfolioCard from "../../components/PortfolioCard";
import { wrappedTCO02Abi } from "../../constants/WrappedTCO2";
import {ethers } from "ethers";

import dotenv from "dotenv";
dotenv.config()
const GET_PROJECT_DATA = gql`
  query GetProjectData {
    projects {
      projectId
      standard
      methodology
      region
      storageMethod
      method
      emissionType
      category
      uri
      beneficiary
    }
    vintages {
      name
      startTime
      endTime
      projectTokenId
      totalVintageQuantity
      isCorsiaCompliant
      isCCPcompliant
      coBenefits
      correspAdjustment
      additionalCertification
      uri
    }
  }
`;
interface ProjectData {
  projectId: string;
  details: any;  
  image: any;    
}
const ALCHEMY_RPC_URL = process.env.NEXT_PUBLIC_POLYGON_MUMBAI_RPC_URL || "";

function Portfolio() {
  // const { loading, error, data } = useQuery(GET_PROJECT_DATA);
  // console.log(data);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [projectData, setProjectData] = useState(null);
  const [projectImage, setProjectImage] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [attributes, setAttributes] = useState(null);
  const contractAddress = "0xd81cFfa66914174F7E4824fA226caB73eEBA12AD";

 
  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(ALCHEMY_RPC_URL);
        const contract = new ethers.Contract(contractAddress, wrappedTCO02Abi, provider);
  
        const data = await contract.getAttributes();
        console.log('attr data', data);
        setAttributes(data);
      } catch (error) {
        console.error("Error fetching attributes:", error);
        // Additional error handling as needed
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchAttributes();
  }, []);
  
  useEffect(() => {
    const projectIds = ["VCS-439", "VCS-674"]; // Array of project IDs
    const fetchedProjects:ProjectData[] = [];
  
    const fetchProjectDataSequentially = async () => {
      for (const projectId of projectIds) {
        try {
          // Fetch project details and image sequentially
          const response = await fetch(`/api/bezero?projectId=${projectId}`);
          if (!response.ok) {
            throw new Error(`Error fetching data for project ${projectId}`);
          }
          const projectData = await response.json();
          fetchedProjects.push(projectData);
        } catch (err) {
          console.error(`Error fetching data for project ${projectId}:`, err);
          // Handle error or add partial data
        }
      }
  
      setProjects(fetchedProjects);
      setIsLoading(false);
    };
  
    fetchProjectDataSequentially();
  }, []);
  
  
  console.log(JSON.stringify(projects, null, 2));
  return (
    <div className="bg-[#181B21] flex flex-col pb-12">
      <div className="bg-gray-800 self-center flex w-full max-w-[1520px] flex-col items-center mt-6 pt-12 px-16 max-md:max-w-full max-md:px-5">
        <Image
          priority
          src={"/bg.svg"}
          alt="Follow us on Twitter"
          width={1000}
          height={100}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      <div className="text-white text-4xl font-bold leading-10 self-center whitespace-nowrap mt-24 max-md:mt-10">
        Toucans
      </div>
      <div className="items-stretch self-center flex w-[168px] max-w-full justify-between gap-5 mt-6 px-5 max-md:justify-center">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/23b56cb0acd4bcf5bfe0859893c67a2273c2061aae6f89287752645e1044158d?"
          className="aspect-square object-contain object-center w-full justify-center items-center overflow-hidden shrink-0 flex-1"
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7fbd343646852a0120a78af4fd9bfc7ee8972eb1b63f367e7a36ea394b5cfae0?"
          className="aspect-square object-contain object-center w-full justify-center items-center overflow-hidden shrink-0 flex-1"
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5773b6fa4fb4055406572d3cc66e904e1cb65b77b49e5fb4a4ea910fa6493e19?"
          className="aspect-square object-contain object-center w-full overflow-hidden shrink-0 flex-1"
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b7f15ad44dbdc3d4a890a8cf3092207ee729cf9ba320894390467218699b2353?"
          className="aspect-square object-contain object-center w-full justify-center items-center overflow-hidden shrink-0 flex-1"
        />
      </div>
      <div className="self-center text-slate-500 text-center text-sm leading-6 max-w-[740px] mt-6 max-md:max-w-full">
        Toucan Carbon Credits... Lorem Ipsum Toucan Carbon Credits... Lorem
        Ipsum Toucan Carbon Credits... Lorem Ipsum Toucan Carbon Credits...
        Lorem Ipsum Toucan Carbon Credits... Lorem Ipsum Toucan Carbon
        Credits... Lorem Ipsum Toucan Carbon Credits... Lorem Ipsum Toucan
        Carbon Credits... Lorem Ipsum Toucan Carbon Credits... Lorem Ipsum
        Toucan Carbon Credits... Lorem Ipsum Toucan Carbon
      </div>
      <div className="items-stretch self-center flex gap-4 mt-6 px-5 max-md:justify-center">
        <div className="justify-between items-stretch border border-[color:var(--primary-5,#3D6EFF)] flex gap-2 p-4 rounded-xl border-solid">
          <div className="text-blue-500 text-base font-bold leading-6 grow whitespace-nowrap">
            0x6c23...4242
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0c0099bac1dff8bf81c966252bafb27856d88c1bd313e183f99f5d3b68a2996d?"
            className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
          />
        </div>
        <div className="justify-center items-center border border-[color:var(--primary-5,#3D6EFF)] flex aspect-square flex-col w-14 h-14 px-4 rounded-xl border-solid">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/314b00f00da1afbb16b8bf6d36425a0f4272684819e9b14e92afe4267f139214?"
            className="aspect-square object-contain object-center w-full justify-center items-center overflow-hidden"
          />
        </div>
        <div className="justify-center items-center border border-[color:var(--primary-5,#3D6EFF)] flex aspect-square flex-col w-14 h-14 px-4 rounded-xl border-solid">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a62e7420ddfe4a1c93cfef23bb2315a2317938b5f943f6d9942a4287f0f595b2?"
            className="aspect-square object-contain object-center w-full overflow-hidden"
          />
        </div>
      </div>
      <div className="items-stretch self-center bg-neutral-900 flex w-[740px] max-w-full justify-between gap-5 mt-10 pl-12 pr-9 py-1 rounded-xl max-md:flex-wrap max-md:px-5">
        <div className="flex items-stretch justify-between gap-5 max-md:justify-center">
          <div className="text-white text-base font-semibold leading-6 self-center whitespace-nowrap my-auto">
            On Sale
          </div>
          <div className="text-gray-900 text-base font-semibold leading-6 whitespace-nowrap justify-center items-stretch bg-white grow px-12 py-2 rounded-lg max-md:px-5">
            Items
          </div>
          <div className="text-white text-base font-semibold leading-6 self-center whitespace-nowrap my-auto">
            Collections
          </div>
        </div>
        <div className="self-center flex items-stretch justify-between gap-5 my-auto">
          <div className="text-white text-base font-semibold leading-6 whitespace-nowrap">
            Offers
          </div>
          <div className="text-white text-base font-semibold leading-6 whitespace-nowrap">
            Activities
          </div>
        </div>
      </div>
      <div className="items-center flex justify-between gap-5 mr-20 mt-8 self-end max-md:mr-2.5">
        <div className="items-stretch flex gap-2 my-auto">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ba28a7102f1ca0affa4b6a2eb50c76c8673636505bec30522f391c47bdbd24e?"
            className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
          />
          <div className="text-white text-sm leading-6 grow whitespace-nowrap">
            Bulk
          </div>
        </div>
        <div className="justify-between items-stretch bg-gray-900 self-stretch flex gap-2 px-6 py-3 rounded-xl max-md:px-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5062355253de57678c83238caaa1d409e3b00bf26aa17e597e82c3c77cff166e?"
            className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full"
          />
          <div className="text-blue-500 text-base font-bold leading-6 grow whitespace-nowrap">
            Filter
          </div>
        </div>
      </div>
      <div className="self-center w-full max-w-[1520px] mt-10 px-5 max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <PortfolioCard imageUrl="/tree.png" title="Seefone" />
        </div>
      </div>
      <div className="self-center w-[1520px] max-w-full mt-10 mb-20 max-md:mb-10 max-md:pr-5">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
            <div className="items-stretch bg-neutral-900 flex w-full grow flex-col mx-auto pb-6 rounded-xl max-md:mt-10">
              <div className="items-start bg-gray-800 flex shrink-0 h-[350px] flex-col" />
              <div className="justify-between items-stretch self-center flex w-[302px] max-w-full gap-5 mt-6">
                <div className="items-stretch flex justify-between gap-2">
                  <div className="text-slate-500 text-sm leading-6 grow whitespace-nowrap">
                    Verified Toucan
                  </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/69e60b54292a42ff1a04ea299be2f6179c35bb0a71e4399f86c4e488289e6f48?"
                    className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full"
                  />
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5e3ace5ee2facaae50de1198894af679d1e4d912c30723ef6f58912f56eecda?"
                  className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full"
                />
              </div>
              <div className="text-white text-lg font-semibold leading-7 self-center whitespace-nowrap mt-2">
                Seefone
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
            <div className="items-stretch bg-neutral-900 flex w-full grow flex-col mx-auto pb-6 rounded-xl max-md:mt-10">
              <div className="items-start bg-gray-800 flex shrink-0 h-[350px] flex-col" />
              <div className="justify-between items-stretch self-center flex w-[302px] max-w-full gap-5 mt-6">
                <div className="items-stretch flex justify-between gap-2">
                  <div className="text-slate-500 text-sm leading-6 grow whitespace-nowrap">
                    Verified Toucan
                  </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/69e60b54292a42ff1a04ea299be2f6179c35bb0a71e4399f86c4e488289e6f48?"
                    className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full"
                  />
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5e3ace5ee2facaae50de1198894af679d1e4d912c30723ef6f58912f56eecda?"
                  className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full"
                />
              </div>
              <div className="text-white text-lg font-semibold leading-7 self-center whitespace-nowrap mt-2">
                WMRV Toucan #101
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;

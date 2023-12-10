function Footer() {
  return (
    <div className="bg-zinc-900 flex w-full flex-col items-stretch px-20 py-12 max-md:max-w-full max-md:px-5">
      <div className="flex w-full items-stretch justify-between gap-5 mt-32 pr-16 max-md:max-w-full max-md:flex-wrap max-md:mt-10 max-md:pr-5">
        <div className="flex grow basis-[0%] flex-col items-stretch">
          <div className="justify-between items-stretch flex gap-3">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6db97e7db0118084c7e50eaa8fee29c00fcd8aee2259b8e718dde71af63f3ce1?"
              className="aspect-[0.71] object-contain object-center w-[51px] overflow-hidden shrink-0 max-w-full"
            />
            <div className="text-white text-4xl font-bold leading-5 self-center grow whitespace-nowrap my-auto">
              Verified MRV
            </div>
          </div>
          <div className="text-white text-center text-lg font-semibold leading-7 whitespace-nowrap mt-16 max-md:mt-10">
            Join Verified MRV community
          </div>
          <div className="items-stretch flex justify-between gap-5 mt-6 pr-20 max-md:pr-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0f9e4d8ddbf26ceca9c884d72f627307dc1720e833cfaaafc9551c674a5e4c8?"
              className="aspect-square object-contain object-center w-10 justify-center items-center overflow-hidden shrink-0 max-w-full"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f77092afd6c86cdd34be6ad182adc7f1646f1468c46630bb3dd787c146bd889?"
              className="aspect-square object-contain object-center w-10 justify-center items-center overflow-hidden shrink-0 max-w-full"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e4bd8e431541c2314dcaa17d9f823514c2b41f706dc5505c34fb28539e09693?"
              className="aspect-square object-contain object-center w-10 justify-center items-center overflow-hidden shrink-0 max-w-full"
            />
          </div>
        </div>
        <div className="flex items-stretch justify-between gap-5 self-start max-md:max-w-full max-md:flex-wrap">
          <div className="items-stretch flex grow basis-[0%] flex-col">
            <div className="text-white text-xl font-bold leading-7 whitespace-nowrap">
              Resources
            </div>
            <div className="text-slate-500 text-lg leading-7 whitespace-nowrap mt-10">
              Help Center
            </div>
            <div className="text-slate-500 text-lg leading-7 whitespace-nowrap mt-10">
              FAQ
            </div>
          </div>
          <div className="items-stretch flex grow basis-[0%] flex-col">
            <div className="text-white text-xl font-bold leading-7 whitespace-nowrap">
              Links
            </div>
            <div className="text-slate-500 text-lg leading-7 whitespace-nowrap mt-10">
              Privacy Policy
            </div>
            <div className="text-slate-500 text-lg leading-7 whitespace-nowrap mt-10">
              Terms of Service
            </div>
          </div>
        </div>
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/df5112d98403226b9e23be6b87c4b6b0190991c8e933d1322975ae20538a6cc8?"
        className="aspect-[1520] object-contain object-center w-full stroke-[1px] stroke-gray-700 overflow-hidden mt-40 max-md:max-w-full max-md:mt-10"
      />
      <div className="text-slate-500 text-lg leading-7 whitespace-nowrap mt-8 max-md:max-w-full">
        © Verified MRV 2023, Inc. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;

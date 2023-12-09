import { useState } from "react";
// Interface for your data type
interface Data {
    id: number;
    afforestation: string;
    rally: string;
    ratingMethodology: string;
    wrap: string;
    redis: string;
  }
  
export  interface  SelectElemProps {
  bgColor: string, 
  projectName: string,
  rating : string,
  ratingMethodology : string,
  buttons : string[],
  data: Data[];
}


 
  // Component with state to manage selection and visual highlight
  const SelectElem: React.FC<SelectElemProps> = ({   
   }) => {
    const [selectedRowId, setSelectedRowId] = useState<number | undefined>();
    
    const handleRowClick = (id: number) => {
      setSelectedRowId(id);
    };
  
    return (
    
        <div className="flex flex-col pt-4 px-4 items-start  w-full">
          <div className="flex gap-5 items-start py-4">
            <div className="items-stretch flex gap-2">
              <div className="text-white text-sm leading-6 grow whitespace-nowrap">
               <span className="px-2"><input type="checkbox"  className="w-5 p-2 checked:bg-blue-500" /></span> Select All
              </div>
            </div>
            <div className="items-stretch self-stretch flex justify-between gap-2">
            <button className="items-stretch rounded border bg-green-300  bg-opacity-[10%] flex  flex-col justify-center px-2 py-1 border-solid border-zinc-500 text-white">Wrap</button>
            <button className="items-stretch rounded border bg-rose-800  bg-opacity-[10%] flex  flex-col justify-center px-2 py-1 border-solid border-zinc-500 text-rose-800">Retire All</button> 
            </div>
          </div>
          <div className="items-start py-4 self-stretch flex gap-0 mt-1 border-b-violet-200 border-b-opacity-10 border-b border-solid max-md:max-w-full max-md:flex-wrap max-md:justify-center">
           
            <div className="items-center self-stretch flex justify-between gap-0">
            <span className="px-2"><input type="checkbox"  className="w-5  p-2 checked:bg-blue-500" /></span>
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/3ba88d1503f8628e6c01f25ded14c71b5e437bab81379b5a6ec066771f1ed9bd?apiKey=e3802405984e420cb725bf0a04130d05&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ba88d1503f8628e6c01f25ded14c71b5e437bab81379b5a6ec066771f1ed9bd?apiKey=e3802405984e420cb725bf0a04130d05&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ba88d1503f8628e6c01f25ded14c71b5e437bab81379b5a6ec066771f1ed9bd?apiKey=e3802405984e420cb725bf0a04130d05&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ba88d1503f8628e6c01f25ded14c71b5e437bab81379b5a6ec066771f1ed9bd?apiKey=e3802405984e420cb725bf0a04130d05&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ba88d1503f8628e6c01f25ded14c71b5e437bab81379b5a6ec066771f1ed9bd?apiKey=e3802405984e420cb725bf0a04130d05&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ba88d1503f8628e6c01f25ded14c71b5e437bab81379b5a6ec066771f1ed9bd?apiKey=e3802405984e420cb725bf0a04130d05&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ba88d1503f8628e6c01f25ded14c71b5e437bab81379b5a6ec066771f1ed9bd?apiKey=e3802405984e420cb725bf0a04130d05&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ba88d1503f8628e6c01f25ded14c71b5e437bab81379b5a6ec066771f1ed9bd?apiKey=e3802405984e420cb725bf0a04130d05&"
                className="aspect-square object-contain object-center w-10 h-10 justify-center items-center overflow-hidden shrink-0 max-w-full my-auto p-2"
              />
              <div className="items-stretch self-stretch bg-violet-200 bg-opacity-0 flex grow basis-[0%] flex-col justify-center px-2.5 py-1.5">
                <div className="items-stretch rounded border flex flex-col pl-3 pr-9 pb-2.5 border-solid border-violet-200 border-opacity-20 max-md:pr-5">
                  <div className="text-violet-200 text-opacity-40 text-xs leading-3 tracking-normal whitespace-nowrap items-stretch bg-gray-900 justify-center px-1.5">
                    Project Name
                  </div>
                  <div className="text-violet-200 text-opacity-90 text-sm leading-5 tracking-normal whitespace-nowrap mt-2">
                    Afforestation #1
                  </div>
                </div>
              </div>
            </div>
            <div className="items-stretch self-stretch bg-violet-200 bg-opacity-0 flex grow basis-[0%] flex-col justify-center px-2.5 py-1.5">
              <div className="items-stretch rounded border flex flex-col pl-3 pr-9 pb-2 border-solid border-violet-200 border-opacity-20 max-md:pr-5">
                <div className="text-violet-200 text-opacity-40 text-xs leading-3 tracking-normal whitespace-nowrap items-stretch bg-gray-900 justify-center pl-1 pr-5">
                  Rating
                </div>
                <div className="text-violet-200 text-opacity-40 text-base leading-6 tracking-normal mt-1.5">
                  AAA
                </div>
              </div>
            </div>
            <div className="items-stretch self-stretch bg-violet-200 bg-opacity-0 flex grow basis-[0%] flex-col justify-center px-2.5 py-1.5">
              <div className="items-stretch rounded border flex flex-col pl-3 pr-9 pb-2 border-solid border-violet-200 border-opacity-20 max-md:pr-5">
                <div className="text-violet-200 text-opacity-60 text-xs leading-3 tracking-normal whitespace-nowrap items-stretch bg-gray-900 justify-center px-1.5">
                  Rating Methodology
                </div>
                <div className="text-violet-200 text-opacity-40 text-base leading-6 tracking-normal mt-1.5">
                  VCS
                </div>
              </div>
            </div>
            <div className="items-stretch self-stretch bg-violet-200 bg-opacity-0 flex justify-between gap-0 px-2.5 py-3">
              <div className="items-stretch flex justify-between gap-2">
                    <button className="items-stretch rounded border bg-green-300  bg-opacity-[10%] flex  flex-col justify-center px-2 py-1 border-solid border-zinc-500 text-white">Wrap</button>
            <button className="items-stretch rounded border bg-rose-800  bg-opacity-[10%] flex  flex-col justify-center px-2 py-1 border-solid border-zinc-500 text-rose-800">Retire</button> 
              </div>
        
            </div>
          </div>
          
      
        </div>
    );
  };

export default SelectElem;
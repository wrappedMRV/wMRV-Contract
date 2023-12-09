import SelectElem from "./SelectElem";

const ChainInfo: React.FC<{ chainName: string; tokenCount: string }> = ({ chainName, tokenCount }) => (
    <div className="flex items-center mb-4">
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/92506c386274628b1d4bcf22e27eb7c3397b753eb30ecd9a8bda0109eb1d0b37?apiKey=e3802405984e420cb725bf0a04130d05&" alt="Chain logo" className="w-8 h-8 mr-2" /> {/* Replace with actual logo URL */}
      <div className="text-white">
        <h2 className="text-xl font-bold">{chainName}</h2>
        <p className="text-zinc-400">{tokenCount} Tokens</p>
      </div>
    </div>
  );
  
  // Component for displaying individual token info
  const TokenRow: React.FC<{ name: string; balance: string; change: string, imgUrl:string}> = ({ name, balance, change,imgUrl }) => (
    <div className="flex justify-between items-center border-b border-zinc-700 py-2">
      <div className="flex items-center">
        <img src={imgUrl} alt="Token logo" className="w-8 h-8 mr-2" /> {/* Replace with actual token URL */}
        <div className="text-white">
          <h3 className="font-bold">{name}</h3>
        </div>
      </div>
      <div className="text-right">
        <span className="text-white font-bold">{balance}</span>
        <span className={`ml-2 ${change.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>{change}</span>
      </div>
    </div>
  );
  
  // The main card component
  const CarbonAssetCard: React.FC = () => (
    <div className="bg-[#141414] rounded-xl p-6 w-3/4  mx-auto">
      <ChainInfo chainName="Matic Chain" tokenCount="2" />
      <div className="flex justify-between text-xl text-white py-2">
        <div><h3>Token Name</h3></div>
        <div><h3>Balance</h3></div>
      </div>
     
  
       {/* Token Rows for Desktop View */}
       <div className="block">
        <TokenRow name="Wrapped Toucan CO2 Tokens" balance="100 MATIC" change="+5%" imgUrl='https://cdn.builder.io/api/v1/image/assets/TEMP/12c466e3bc1b55d52ea2c0802f192fbf266b8301d7ac4b5f116ddd63d4653b2b?apiKey=e3802405984e420cb725bf0a04130d05&width=100 100w' />
        <TokenRow name="Toucan CO2 Tokens" balance="100 MATIC" change="-3%" imgUrl='https://cdn.builder.io/api/v1/image/assets/TEMP/7c373d914e9f2d37913e06f3b6f880323f6ee5381090037c372bdbb0425c4d21?apiKey=e3802405984e420cb725bf0a04130d05&width=100 100w' />
      </div>
<div className="flex justify-center">
<button className="text-teal-500 mt-4">View All</button>
</div>
<SelectElem data={[]} bgColor='' projectName='' rating= '' ratingMethodology='' buttons={[]} />
    </div>
  );
  

export default CarbonAssetCard;
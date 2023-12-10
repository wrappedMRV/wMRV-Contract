"use client"

import { useAccount } from 'wagmi';
import { useState } from 'react';

const ShowAddressButton = () => {
  const { address, isConnected } = useAccount();
  const [showAddress, setShowAddress] = useState(false);

  const toggleAddress = () => {
    // Only toggle if the user is connected
    if (isConnected) {
      setShowAddress(!showAddress);
    }
  };

  return (
    <div>
      <button onClick={toggleAddress}>
        {showAddress ? address : <div className="text-md">0x000000</div>}
      </button>
    </div>
  );
};

export default ShowAddressButton;

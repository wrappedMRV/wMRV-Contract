import React, { useState } from "react";

type FAQCardProps = {
  title: string;
  text: string;
};

const FAQCard: React.FC<FAQCardProps> = ({ title, text }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="border rounded shadow-md mb-2">
      <button
        onClick={toggleOpen}
        className="w-full text-left p-4 font-bold text-lg hover:bg-gray-100 focus:outline-none"
      >
        {title}
      </button>
      {isOpen && <div className="p-4 border-t">{text}</div>}
    </div>
  );
};

export default FAQCard;

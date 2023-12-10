import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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
        className="w-full flex justify-between items-center p-4 font-bold text-lg bg-white text-zinc-900 hover:bg-gray-100 focus:outline-none"
      >
        {title}
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>
      {isOpen && <div className="p-4 border-t bg-white text-zinc-900 ">{text}</div>}
    </div>
  );
};

export default FAQCard;

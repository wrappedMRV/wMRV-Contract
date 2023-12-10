interface ButtonProps {
  label: string;
  onClick: () => void;
}

const ButtonComp: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="bg-stone-900 text-white py-2 px-4 rounded-lg"
  >
    {label}
  </button>
);

export default ButtonComp;

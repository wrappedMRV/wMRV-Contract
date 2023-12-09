interface CardProps {
    title: string;
    children: React.ReactNode;
  }
  
  const Card: React.FC<CardProps> = ({ title, children }) => (
    <div className="bg-neutral-900 rounded-2xl p-6">
      <div className="text-white text-lg font-bold leading-7">{title}</div>
      {children}
    </div>
  );
  
  export default Card;
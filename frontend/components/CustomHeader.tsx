const CustomHeader: React.FC<{ title: string; className?: string }> = ({
  title,
  className,
}) => <div className={`text-white font-bold ${className}`}>{title}</div>;

export default CustomHeader;

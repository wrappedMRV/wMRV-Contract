interface StatisticProps {
    label: string;
    value: string | number;
  }
  
  const Statistic: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex justify-between items-center">
      <div className="text-white text-base font-bold">{label}</div>
      <div className="text-white">{value}</div>
    </div>
  );

  export default Statistic;
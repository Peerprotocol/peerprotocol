import React from "react";

interface InfocardProps {
  title: string;
  value: string;
}

const InfoCard: React.FC<InfocardProps> = ({ title, value }) => {
  return (
    <div className="w-full h-full py-4 flex flex-col gap-4">
      <span>
        <p className="text-[1rem] leading-10 text-[#ffffff7e]">{title}</p>
        <h2 className="text-[2rem] font-bold tracking-widest">{value}</h2>
      </span>
    </div>
  );
};

export default InfoCard;

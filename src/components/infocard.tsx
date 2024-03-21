import React from "react";

interface InfocardProps {
  title: string;
  value: string;
  title1: string;
  value1: string;
}

const InfoCard: React.FC<InfocardProps> = ({
  title,
  value,
  title1,
  value1,
}) => {
  return (
    <div className="w-full h-full py-4 flex flex-col gap-4">
      <span>
        <p className="text-[1rem] leading-10 text-[#ffffff7e]">{title}</p>
        <h2 className="text-[2rem] tracking-widest">{value}</h2>
      </span>

      <span>
        <p className="text-[1rem] leading-10 text-[#ffffff7e]">{title1}</p>
        <h2 className="text-[2rem] tracking-widest">{value1}</h2>
      </span>
    </div>
  );
};

export default InfoCard;

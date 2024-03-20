import React from "react";

interface InfocardProps {
  title: string;
  value: string;
  title1: string;
  value1: string;
}

const InfoCard: React.FC<InfocardProps> =({ title, value, title1, value1})  =>  {
    return (
      <div className="w-full h-full ">
        <p className="text-[1.5rem] leading-10 text-[#ffffff7e]">{title}</p>
        <h2 className="text-[2rem] tracking-widest">{value}</h2>

        <p className="text-[1.5rem] leading-10 text-[#ffffff7e]">{title1}</p>
        <h2 className="text-[2rem] tracking-widest">{value1}</h2>
        {/* {subtitle && <p className="text-sm leading-10 text-[#ffffff7e]">{subtitle}</p>} */}
      </div>
    );
  };
  
  export default InfoCard;
  

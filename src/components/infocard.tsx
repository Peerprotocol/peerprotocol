import React from "react";

const InfoCard = ({ title, value, title1, value1, subtitle }: {
    title: any;
    value: any;
    title1: any;
    value1: any;
    subtitle: any;
})  =>  {
    return (
      <div>
        <p className="text-sm leading-10 text-[#ffffff7e]">{title}</p>
        <h2 className="text-4xl tracking-widest">{value}</h2>

        <p className="text-sm leading-10 text-[#ffffff7e]">{title1}</p>
        <h2 className="text-4xl tracking-widest">{value1}</h2>
        {subtitle && <p className="text-sm leading-10 text-[#ffffff7e]">{subtitle}</p>}
      </div>
    );
  };
  
  export default InfoCard;
  

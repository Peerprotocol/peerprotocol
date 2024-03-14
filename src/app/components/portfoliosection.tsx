import React from 'react';
import InfoCard from './infocard';

const IndexPage = () => {
  const infoData = [
    {
        title: "Net Value", 
        value: "$60,000", 
        title1: 'Borrow Power', 
        value1: '$2500'
    },

    {
        title: 'Total Deposit', 
        value: '$600,000',
        title1: 'Total Lent', 
        value1: '$250,000'
    },
    
    {
        title: 'Total Earned Interest', 
        value: '$250,000',
        title1: 'APY(%)', 
        value1: '$2500'
    }
  ];

  return (
    <div className="flex my-8 bg-[#ffffff0e] h-80 border border-neutral-700 rounded-3xl">
      <div className= "flex items-center w-full justify-center mx-14">
        <div className="grid grid-cols-3 gap-60">
          {infoData.map((info, index) => (
            <div key={index} className="flex tracking-widest leading-10">
              <InfoCard 
                    title={info.title} 
                    value={info.value} 
                    title1={info.title1} 
                    value1={info.value1} 
                    subtitle={undefined} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default IndexPage;


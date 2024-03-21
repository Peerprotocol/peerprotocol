import React from 'react';
import InfoCard from './infocard';
import { InfoCardprops } from '@/data/data';
import Health from './healthmeter';

const IndexPage = () => {
  

  return (
      <div className= "flex flex-row items-center gap-4 py-2 w-full justify-center my-8 bg-[#ffffff0e] border border-neutral-700 rounded-3xl">
        <div className="grid h-[fit-content] grid-cols-3 gap-3 place-items-start px-4 w-[70%]">
          {InfoCardprops.map((info, index) => (
            <div key={index} className="flex tracking-widest h-full leading-10">
              <InfoCard 
                    title={info.title} 
                    value={info.value} 
                    title1={info.title1} 
                    value1={info.value1} /> 
            </div>
          ))}
        </div>
        <Health />
      </div>
  );
};

export default IndexPage;


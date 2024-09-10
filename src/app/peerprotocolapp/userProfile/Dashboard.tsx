import React from 'react';
import Image from 'next/image';
import Info from "../../../../public/images/info.svg";
import { dashboardItems } from './DashboardData'; // Import the data

const Dashboard = () => {
    return (
        <div className="border border-gray-200 rounded-[1rem] grid grid-cols-3 gap-6 p-6 bg-white flex-grow">
            {dashboardItems.map((item, index) => (
                <div key={index} className='border border-gray-200 p-6 rounded-xl bg-smoke-white relative flex flex-col justify-center'>
                    <p className='text-sm text-gray-400'>{item.label}</p>
                    <p className='text-[2.5rem] font-medium text-gray-700'>{item.value}</p>
                    {item.info && (
                        <Image
                            src={Info}
                            height={20}
                            width={20}
                            alt="info-icon"
                            className="cursor-pointer absolute top-2 right-3"
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Dashboard;

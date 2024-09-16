import Image from "next/image";

const Dashboard = () => {
    return ( 
        <div className="bg-[#FFFFFF] border rounded-lg grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 py-5 px-5">
            <div className="relative bg-smoke-white py-14 px-4 border rounded-lg">
                <p className="text-gray-500 text-xs">Total Value Locked</p>
                <p className="text-black font-semibold text-2xl md:text-4xl pt-2">$20.04M</p>
                <Image className="cursor-pointer absolute top-3 right-3" src="./images/info.svg" width={30} height={30} alt="images"/>
            </div>
            <div className="relative bg-smoke-white py-14 px-4 border rounded-lg">
                <p className="text-gray-500 text-xs">Total Lend Value</p>
                <p className="text-black font-semibold text-2xl md:text-4xl pt-2">$13.308M</p>
            </div>
            <div className="relative bg-smoke-white py-14 px-4 border rounded-lg">
                <p className="text-gray-500 text-xs">Total Borrow Value</p>
                <p className="text-black font-semibold text-2xl md:text-4xl pt-2">$6.680M</p>
            </div>
            <div className="relative bg-smoke-white py-14 px-4 border rounded-lg">
                <p className="text-gray-500 text-xs">Active P2P Deals</p>
                <p className="text-black font-semibold text-2xl md:text-4xl pt-2">3536</p>
                <Image className="cursor-pointer absolute top-3 right-3" src="./images/info.svg" width={30} height={30} alt="images"/>
            </div>
            <div className="relative bg-smoke-white py-14 px-4 border rounded-lg">
                <p className="text-gray-500 text-xs">Completed P2P deals</p>
                <p className="text-black font-semibold text-2xl md:text-4xl pt-2">856</p>
                <Image className="cursor-pointer absolute top-3 right-3" src="./images/info.svg" width={30} height={30} alt="images"/>
            </div>
            <div className="relative bg-smoke-white py-14 px-4 border rounded-lg">
                <p className="text-gray-500 text-xs">Total Interest Paid</p>
                <p className="text-black font-semibold text-2xl md:text-4xl pt-2">$142.05K</p>
                <Image className="cursor-pointer absolute top-3 right-3" src="./images/info.svg" width={30} height={30} alt="images"/>
            </div>
        </div>
     );
}
 
export default Dashboard;
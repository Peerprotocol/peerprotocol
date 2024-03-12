import React from "react";

const Portfolio = () => {
  return (
    <div>
      <div className="h-72 bg-[#FFFFFF0D] rounded-3xl mx-14 my-12 flex">
        <div className="mx-32 flex w-full">
          <div className="w-full h-full flex flex-col justify-center">
            <div className="flex gap-16">
              <div className="flex flex-col justify-center gap-8">
                <div>
                  <p className="text-sm">Net Value</p>
                  <h2 className="text-5xl">$600,000</h2>
                </div>
                <div>
                  <p className="text-sm">Borrow Power</p>
                  <h2 className="text-5xl">$2500</h2>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-8">
                <div>
                  <p className="text-sm">Total Deposit</p>
                  <h2 className="text-5xl">$600,000</h2>
                </div>
                <div>
                  <p className="text-sm">Total Lent</p>
                  <h2 className="text-5xl">$2500</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center h-full flex-col gap-8">
            <div>
              <p className="text-xs">Net APY</p>
              <p className="text-5xl">0.00%</p>
            </div>
            <div>
              <p className="text-xs">LTV</p>
              <p className="text-5xl">0.02%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

const Health = () => {
    return ( 
        <div className="flex flex-col justify-center bg-red-900 basis-1/5 items-center rounded-full">
        <div>
          <p className="text-xs">Net APY</p>
          <p className="text-5xl">0.00%</p>
        </div>
        <div>
          <p className="text-xs">LTV</p>
          <p className="text-5xl">0.02%</p>
        </div>
      </div>
     );
}
 
export default Health;
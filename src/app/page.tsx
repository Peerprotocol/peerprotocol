import Navbar from "../components/nav";
import Portfolio from "../components/portfoliosection";
import Health from "../components/healthmeter";
import Transaction from "../components/transaction";
import Transactiontable from "../components/transactiontable";


export default function Home() {
  return (
    <main className="w-full p-4">
      <div>
        <Navbar />
        <div className="flex justify-between items-center mx-16">
          <Portfolio />
          <Health />
        </div>
          <Transaction />
          <Transactiontable/>
      </div>
    </main>
  );
}

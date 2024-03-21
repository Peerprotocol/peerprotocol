import Navbar from "../components/nav";
import Portfolio from "../components/portfoliosection";
import Transaction from "../components/TransactionHistory";


export default function Home() {
  return (
    <main className="w-full p-4">
      <Navbar />
      <section className='max-w-7xl mx-auto w-full p-4'>
        <Portfolio />
        <Transaction />
      </section>
    </main>
  );
}

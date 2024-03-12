import Navbar from "./components/nav";
import Portfolio from "./components/portfoliosection";

export default function Home() {
  return (
    <main className="w-full p-4">
      <div>
        <Navbar />
        <Portfolio />
      </div>
    </main>
  );
}

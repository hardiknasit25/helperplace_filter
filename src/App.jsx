import Filter from "./Components/Filter/Filter";
import Header from "./Components/Header/Header";
import Hero from "./Components/Hero/Hero";
import People from "./Components/People/People";

function App() {
  return (
    <div className=" pr-20 ps-20">
      <Header />
      <Hero />
      <div className="flex gap-5">
        <Filter />
        <People />
      </div>
    </div>
  )
}

export default App;
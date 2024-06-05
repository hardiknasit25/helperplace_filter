import Filter from "../Filter/Filter";
import Hero from "../Hero/Hero";
import People from "../People/People";

function Candidates() {
  return (
    <>
      <Hero />
      <div className="flex gap-5">
        <Filter />
        <People />
      </div>
    </>
  )
}

export default Candidates
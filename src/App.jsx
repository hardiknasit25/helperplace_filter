import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";

function App() {
  return (
    <div className=" pr-20 ps-20">
      <Header />
      <Outlet/>
    </div>
  )
}

export default App;
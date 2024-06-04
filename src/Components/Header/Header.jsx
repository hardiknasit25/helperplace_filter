import logo from "../../assets/helperplace_logo.svg";

function Header() {
  const option = [
    {
      name: "JOBS",
      path: "#"
    },
    {
      name: "CANDIDATES",
      path: "#"
    },
    {
      name: "AGENCY SERVICES",
      path: "#"
    },
    {
      name: "NEWS & MORE",
      path: "#"
    }
  ]
  return (
    <div>
      <div className="flex justify-start h-14 w-full mt-2">
        <div className="w-[10%] h-full flex justify-center items-center">
          <img src={logo} alt="logo"/>
        </div>

        <div className="flex justify-center items-center w-[70%]">
          <ul className="flex justify-start w-full">
            {option.map((item) => (
              <li className="ps-10 font-semibold hover:text-[#054a84] cursor-pointer" key={item}>{item.name}</li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center items-center w-[20%] gap-3 ">
          <button className="bg-[#25ae88] h-[43px] w-[110px] rounded-md text-white p-2 font-bold">LOGIN</button>
          <button className="bg-[#EBBA16] h-[43px] w-[110px] rounded-md text-white p-2 font-bold">REGISTER</button>
        </div>
      </div>
    </div>
  )
}

export default Header
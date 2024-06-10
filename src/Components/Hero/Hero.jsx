import labour from "../../assets/internation-labour-organization.png"
import reuters from '../../assets/Reuters.png'
import google_play from '../../assets/google-play.png'
import gma from '../../assets/GMA.png'
import techin from '../../assets/tech-in-asia.png'
import cna from '../../assets/CNA.png'
import users from '../../assets/users_icon.png'
import Order from "./order"
import Image from "./Image"

function Hero() {

  return (
    <>
      <div className="w-full h-[281px] p-6 border-[1px] border-[#9999] mt-5 bg-[#F9F9F9] rounded-md">
        <div className="flex flex-col justify-start items-start gap-2">
          <div>
            <p className=" text-3xl font-semibold text-[#054A88] underline-offset-2">Quickly Find A Domestic Helper, Nanny or Driver</p>
            <div className=" w-full mt-2 h-[5px] bg-yellow-400"></div>
          </div>

          <div className="mt-2">
            <p className="text-[#777777]">Thousand of domestic workers, helpers or maids are looking now for new employers, we help them to directly connect with you. We are proud to never charge any helpers or candidates. Select your region and get full access to the best domestic helpers!</p>
          </div>

          {/* logos */}
          <div className="flex justify-evenly items-center h-[60px] w-full gap-10 mt-3">
            <Image sorce={labour} alt="labour_logo"/>
            <Image sorce={reuters} alt="reuters_logo"/>
            <Image sorce={google_play} alt="google_play_logo"/>
            <Image sorce={gma} alt="gma_logo"/>
            <Image sorce={techin} alt="techin_logo"/>
            <Image sorce={cna} alt="cna_logo"/>
          </div>

          {/* Trusted Users */}
          <div className="w-full flex justify-end items-center gap-2">
            <div className="w-[23px] h-[36.52px] pt-2 pb-2 flex items-center justify-center ">
              <img src={users} alt="users_icon" className="w-[20px] h-full filter grayscale contrast-200" />
            </div>
            <span className="text-[#666666] font-semibold">Trusted by more than 300k users</span>
          </div>

        </div>

      </div>

      {/* <div className="relative w-full h-[37px] flex justify-end mt-4">
        <div className="w-[150px] h-[37px] p-2 bg-[#25AE88] rounded-md text-white font-semibold flex justify-start items-center gap-2" onClick={() => setShowMenu(!showMenu)}>
          <FaSortAmountDown className="text-white w-4 h-4" />
          <button className=" text-sm font-semibold">{order === 'last_active' ? "Last Active" : order === "available_from" ? "Availble From" : order === "publish_date" ? "Publish Date" : "Last Active"}</button>
        </div>
        {showMenu && (
          <div className="absolute flex flex-col gap-3 top-full right-0 bg-slate-100 z-20">
            <div className="relative w-[150px]  bg-slate-50 z-20">
              <div className="flex flex-col justify-center cursor-pointer gap-2 text-sm hover:bg-slate-100 h-10 p-2" onClick={() => {
                dispatch(addOrder("last_active"))
                setShowMenu(!showMenu)
              }}>
                <span>Last Active</span>
              </div>
              <div className="flex flex-col justify-center cursor-pointer gap-2 text-sm hover:bg-slate-100 h-10 p-2" onClick={() => {
                dispatch(addOrder("available_from"))
                setShowMenu(!showMenu)
              }}>
                <span className="">Availale Form</span>
              </div>
              <div className="flex flex-col justify-center cursor-pointer gap-2 text-sm hover:bg-slate-100 h-10 p-2" onClick={() => {
                dispatch(addOrder("publish_date"))
                setShowMenu(!showMenu)
              }}>
                <span className="">Publish Date</span>
              </div>
            </div>
          </div>
        )}
      </div> */}
      <Order/>
    </>
  )
}

export default Hero
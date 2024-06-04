import profile1 from '../../assets/profile1.jpg'
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function People() {

  return (
    <div className="mt-10 w-full">

      <div className="h-[220px] flex gap-2 shadow-2xl pt-2 pb-2 rounded-md">

        {/* Photo  */}
        <div className="w-[35%] h-fullflex flex-col justify-center items-center">
          <div className="h-[80%] w-full flex justify-center items-center">
            <img src={profile1} alt='profile_image' className='h-[143px] w-[143px] rounded-full overflow-hidden items-center' />
          </div>
          <div className="h-[20%] w-full flex flex-col justify-center items-center mt-1">
            <div style={{ clipPath: 'polygon(0 0, 100% 0, 90% 50%, 100% 100%, 0% 100%)', backgroundColor: "var(--primary-color)" }} color='primary' className='w-full h-[75%] flex justify-center items-center'>
              <p className='text-white font-normal'>Direct</p>
            </div>
            <div className='w-full h-[2px] bg-[#EBBA16]'></div>
          </div>
        </div>


        <div className="p-2 flex flex-col justify-evenly">
          <h4 className="text-primary font-semibold text-[20px]"> Dazel Joy <span>- 36</span></h4>

          <div className="flex gap-5 mt-3">
            <span className="text-secondary font-semibold text-[16px]">Domestic Helper <span>- Finished Contract </span></span>
            <div className='flex justify-center items-center gap-1'>
              <FaLocationDot className='text-[#25AE88]' />
              <span className="text-primary font-semibold text-[16px]">Hong Kong</span>
            </div>
          </div>

          <span className="mt-2 text-[14px]"> I am Lailanie, 42 years old, married, and have 3 children. I am from the Philippines. I worked as a domestic helper for 4 years in the Philippines and 3 years in Taiwan. I am good at household chores, cooking and preparing meals, caregiving, and look... </span>

          <div className="flex mt-5 gap-14">
            <div className='flex justify-center items-center gap-1'>
              <div className='w-4 h-4 bg-[#25AE88] rounded-full'></div>
              <span className="text-primary font-semibold">7yr experience</span>
            </div>

            <div className='flex gap-1 justify-center items-center'>
              <FaCalendarAlt className='text-[#25AE88]' />
              <span className="text-primary font-semibold">From 07 Aug 2024 | Full Time</span>
            </div>

            <div className='flex justify-center items-center gap-2'>
              <div className='w-4 h-4 bg-[#25AE88] rounded-full'></div>
              <span className="text-[#25AE88] font-semibold">Very Active</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default People
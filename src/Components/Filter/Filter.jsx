import { MdOutlineRefresh } from "react-icons/md";

function Filter() {
  return (
    <div className="w-[25%] rounded-md ps-[15px] pr-[15px] mt-10 pb-5 border-[1px] border-[#9999] bg-[#F9F9F9]">

      <div className="p-2 mt-4">
        <span className="text-primary text-2xl mt-2">I'm Looking For</span>
      </div>

      <div>

{/* Filter and reset  */}
        <div className="flex justify-between p-2">
          <span className="font-semibold text-primary text-lg">Filter</span>
          <div className="flex justify-center items-center gap-1 cursor-pointer">
            <MdOutlineRefresh className="text-[#24AE88] font-bold"/>
            <span className="text-[#25AE88] font-semibold text-lg">Reset</span>
          </div>
        </div>

        <div>

{/* job position  */}
          <div className="flex flex-col p-2">
            <span className="text-primary font-semibold">Job Position</span>
            <div className="w-full h-[1.5px] bg-[#25AE88]"></div>

            <div className="mt-2 flex flex-col gap-3 p-2">
              <div className="flex gap-2 justify-start items-center">
                <input
                  type="radio"
                  name="radio"
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="1"
                />
                <span>Domestic Helper</span>
              </div>

              <div className="flex gap-2 justify-start items-center">
                <input
                  type="radio"
                  name="radio"
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="2"
                />
                <span>Driver</span>
              </div>

            </div>

            <div className="flex flex-col gap-3 mt-3">
              <span className="text-primary text-lg font-semibold">Start Date</span>
              <input type="date" className="border-[1px] border-[#9999] p-2 rounded text-sm text-secondary outline-none" />
            </div>

            <div className="flex flex-col gap-3 mt-3">
              <span className="text-primary text-lg font-semibold">Candidate Location</span>
              <input type="date" className="border-[1px] border-[#9999] p-2 rounded text-sm text-secondary outline-none" />
            </div>

          </div>


{/* job type  */}
          <div className="mt-5">
            <span className="text-primary font-semibold mt-5">Job Type</span>
            <div className="w-full h-[2px] bg-[#25AE88]"></div>

            <div className="mt-2 flex flex-col gap-3 p-2">
              <div className="flex gap-2 justify-start items-center">
                <input
                  type="radio"
                  name="radio"
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="1"
                />
                <span>Full Time</span>
              </div>

              <div className="flex gap-2 justify-start items-center">
                <input
                  type="radio"
                  name="radio"
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="2"
                />
                <span>Part Time</span>
              </div>

              <div className="flex gap-2 justify-start items-center">
                <input
                  type="radio"
                  name="radio"
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="3"
                />
                <span>Temporary</span>
              </div>

            </div>

            <div className="flex flex-col gap-3 mt-3">
              <span className="text-primary text-lg font-semibold">Contranct Status</span>
              <input type="date" className="border-[1px] border-[#9999] p-2 rounded text-sm text-secondary outline-none" />
            </div>
          </div>

{/* Resume By */}
          <div className="mt-5">
            <span className="text-primary font-semibold mt-5">Resume by</span>
            <div className="w-full h-[2px] bg-[#25AE88]"></div>

            <div className="mt-2 flex flex-col gap-3 p-2">
              <div className="flex gap-2 justify-start items-center">
                <input
                  type="radio"
                  name="radio"
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="1"
                />
                <span>Direct</span>
              </div>

              <div className="flex gap-2 justify-start items-center">
                <input
                  type="radio"
                  name="radio"
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="2"
                />
                <span>Agency</span>
              </div>
            </div>
          </div>

{/* Working Experience */}
          <div className="mt-5">
            <span className="text-primary font-semibold mt-5">Working Experience</span>
            <div className="w-full h-[2px] bg-[#25AE88]"></div>

            <input type="range" id="points" name="points" min="0" max="40" className="mt-5"></input>

            <div className="flex flex-col gap-3 mt-3">
              <span className="text-primary text-lg font-semibold">Language</span>
              <input type="date" className="border-[1px] border-[#9999] p-2 rounded text-sm text-secondary outline-none" />
            </div>

            <div className="flex flex-col gap-3 mt-3">
              <span className="text-primary text-lg font-semibold">Main Skills</span>
              <input type="date" className="border-[1px] border-[#9999] p-2 rounded text-sm text-secondary outline-none" />
            </div>

            <div className="flex flex-col gap-3 mt-3">
              <span className="text-primary text-lg font-semibold">Nationality</span>
              <input type="date" className="border-[1px] border-[#9999] p-2 rounded text-sm text-secondary outline-none" />
            </div>

          </div>


{/* Gender  */}
          <div className="mt-5">
            <span className="text-primary font-semibold mt-5">Gender</span>
            <div className="w-full h-[2px] bg-[#25AE88]"></div>

            <div className="mt-2 flex flex-col gap-3 p-2">
              <div className="flex gap-2 justify-start items-center">
                <input
                  type="radio"
                  name="radio"
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="1"
                />
                <span>Male</span>
              </div>

              <div className="flex gap-2 justify-start items-center">
                <input
                  type="radio"
                  name="radio"
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="2"
                />
                <span>Female</span>
              </div>
            </div>
          </div>


{/* Age  */}
          <div className="mt-5">
            <span className="text-primary font-semibold mt-5">Age</span>
            <div className="w-full h-[2px] bg-[#25AE88]"></div>

            <input type="range" id="points" name="points" min="0" max="40" className="mt-5"></input>

            <div className="flex flex-col gap-3 mt-3">
              <span className="text-primary text-lg font-semibold">Helper Name</span>
              <input type="date" className="border-[1px] border-[#9999] p-2 rounded text-sm text-secondary outline-none" />
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Filter
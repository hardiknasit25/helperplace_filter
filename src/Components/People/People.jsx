import profile1 from '../../assets/profile1.jpg'
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useSearchParams } from 'react-router-dom';

function People() {

  const [searchParams, setSearchParams] = useSearchParams()

  // Assuming queryParams is an instance of URLSearchParams
  const queryParams = new URLSearchParams(window.location.search);

  // Iterate through each parameter and log its values to the console
  // queryParams.forEach((value, key) => {
  //   // If the parameter has multiple values, value will be an array
  //   if (Array.isArray(value)) {
  //     console.log(`${key}: ${value.join(', ')}`);
  //   } else {
  //     console.log(`${key}: ${value}`);
  //   }
  // });

  const job_position = queryParams.get('job_position') || '';
  const job_type = queryParams.get('job_type') || '';
  const resumeby = queryParams.get('post_manager') || '';
  const nationality = queryParams.get('nationality') || '';
  const gender = queryParams.get('gender') || '';
  const helper_name = queryParams.get('name') || '';
  const date = queryParams.get('start_date') || '';
  const country = queryParams.getAll('country') || [];
  const experience = queryParams.getAll('experience_range') || [];
  const age = queryParams.getAll('age_range') || [];
  const language = queryParams.getAll('Language') || [];
  const currskill = queryParams.getAll('Main-Skills') || [];
  const currContract = queryParams.getAll('contract_status') || [];

  console.log("job_position :", job_position);
  console.log("Date :", date);
  console.log("job_type :", job_type);
  console.log("resum : ", resumeby);
  console.log("nationality : ", nationality);
  console.log("gender : ", gender);
  console.log("helperName : ", helper_name);
  console.log("country : ", country);
  console.log("experience : ", experience);
  console.log("age : ", age);
  console.log("language : ", language);
  console.log("skills : ", currskill);
  console.log("contract status : ", currContract);

  // job_position
  // helperName
  // currNationality
  // currlanguage
  // currContract
  // currLocation
  // currDate
  // currskill
  // age
  // experience
  // jobType
  // jobPosition
  // gender
  // resumeby
  // navigate
  // isInitialRender
  // location.pathname

  return (
    <div className="mt-10 w-full">

      <div className="h-[220px] flex gap-2 shadow-2xl pt-2 pb-2 rounded-lg">

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
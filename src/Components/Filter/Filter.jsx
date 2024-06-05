import { MdOutlineRefresh } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
// import { Select } from '@mantine/core';

function Filter() {

  const [data, setData] = useState([]);
  const [lang, setLang] = useState([]);
  const [contractStatus, setContractStatus] = useState([]);
  const [nationalityName, setNationalityName] = useState([]);
  const [skill, setSkill] = useState([]);
  const [jobLocation, setJobLocation] = useState([]);

  const [helperName, setHelperName] = useState("");
  const [currNationality, setCurrNationality] = useState("");
  const [currskill, setCurrSkill] = useState("");
  const [currlanguage, setCurrLanguage] = useState("");
  const [currContract, setCurrContract] = useState("");
  const [currLocation, setCurrLocation] = useState("");
  const [currDate, setDate] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  console.log("Option ", selectedOption);

  useEffect(() => {
    fetch("/api/mobile/masterdata/GetAllMasterDataJson")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        if (data && data.data.language && data.data.contract_status && data.data.nationality && data.data.skills && data.data.job_location) {
          const languages = data.data.language.map(language => language.language_name);
          const contract_status = data.data.contract_status.map((contract) => contract.contract_sts_name);
          const nationality = data.data.nationality.map(nationality => nationality.nationality_name)
          const skills = data.data.skills.map(skills => skills.skill_name)
          const jobLocations = data.data.job_location.map(joblocation => joblocation.location_name)
          setLang(languages);
          setContractStatus(contract_status)
          setNationalityName(nationality);
          setSkill(skills)
          setJobLocation(jobLocations);
        } else {
          console.log("Language data is missing or not an array:", data.languages);
        }
      })
      .catch(error => console.error('Fetch error:', error));
  }, []);

  return (
    <div className="w-[30%] rounded-md ps-[15px] pr-[15px] mt-10 pb-5 border-[1px] border-[#9999] bg-[#F9F9F9]">

      <div className="p-2 mt-4">
        <span className="text-primary text-2xl mt-2">I'm Looking For</span>
      </div>

      <div>

        {/* Filter and reset  */}
        <div className="flex justify-between p-2">
          <span className="font-semibold text-primary text-lg">Filter</span>
          <div className="flex justify-center items-center gap-1 cursor-pointer">
            <MdOutlineRefresh className="text-[#24AE88] font-bold" />
            <span className="text-[#25AE88] font-semibold text-lg">Reset</span>
          </div>
        </div>

        <div>

          {/* job position  */}
          <div className="flex flex-col p-2">
            <span className="text-primary font-semibold">Job Position</span>
            <div className="w-full h-[1.5px] bg-[#25AE88]"></div>

            <div className="mt-2 flex flex-col gap-3 p-2" id="job_position">
              <div className="flex gap-2 justify-start items-center">
                <input
                  type="radio"
                  name="radio"
                  checked = {selectedOption === "1"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="1"
                />
                <span>Domestic Helper</span>
              </div>

              <div className="flex gap-2 justify-start items-center">
                <input
                  type="radio"
                  name="radio"
                  checked={selectedOption === "2"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="2"
                />
                <span>Driver</span>
              </div>

            </div>

            <div className="flex flex-col gap-3 mt-3">
              <span className="text-primary text-lg font-semibold">Start Date</span>
              <input type="date" className="border-[1px] border-[#9999] p-2 rounded text-sm text-secondary outline-none" onChange={(e) => setDate(e.target.value)}/>
            </div>

            <div className="flex flex-col gap-3 mt-3">
              <span className="text-primary text-lg font-semibold">Candidate Location</span>
              <select className="border-[1px] border-[#9999] p-2 rounded text-sm text-secondary outline-none" value={currLocation} onChange={(e) => setCurrLocation(e.target.value)}>
                {jobLocation.map((location, index) => (
                  <option key={index} value={location}>{location}</option>
                ))}
              </select>
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

              <select className="border-[1px] border-[#9999] p-2 rounded text-sm text-secondary outline-none" value={currContract} onChange={(e) => setCurrContract(e.target.value)}>
                {contractStatus.map((contract, index) => (
                  <option key={index} value={contract}>{contract}</option>
                ))}
              </select>

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
              <select className="border-[1px] border-[#9999] p-2 rounded text-sm text-secondary outline-none" value={currlanguage} onChange={(e) => setCurrLanguage(e.target.value)}>
                {lang.map((language, index) => (
                  <option key={index} value={language}>{language}</option>
                ))}
              </select>
            </div>


            <div className="flex flex-col gap-3 mt-3">
              <span className="text-primary text-lg font-semibold">Main Skills</span>
              <select className="border-[1px] border-[#9999] p-2 rounded text-sm text-secondary outline-none" value={currskill} onChange={(e) => setCurrSkill(e.target.value)}>
                {skill.map((skill_name, index) => (
                  <option value={skill_name} key={index}>{skill_name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-3 mt-3">
              <span className="text-primary text-lg font-semibold">Nationality</span>
              <select className="border-[1px] border-[#9999] p-2 rounded text-sm text-secondary outline-none" onChange={(e) => setCurrNationality(e.target.value)} value={currNationality}>
                {nationalityName.map((nationality, index) => (
                  <option value={nationality} key={index}>{nationality}</option>
                ))}
              </select>
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
              <div className="border-[1px] w-full border-[#9999] rounded flex justify-between items-center pr-5">
                <input type="text" placeholder="Search with Helper Name" className=" p-2  text-sm text-secondary outline-none" value={helperName} onChange={(e) => setHelperName(e.target.value)} />
                <IoSearchOutline className="text-[#3a3a3a99] h-5 w-5" />
              </div>
            </div>

          </div>

        </div>
      </div>

      <button className=" bg-red-500">Hello</button>
    </div>
  )
}

export default Filter
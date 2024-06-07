import { MdOutlineRefresh } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import SelectBox from "../SelectFiled/SelectBox";
import { FormControl, MenuItem, Select, Slider } from "@mui/material";

function Filter() {

  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState([]);
  const [lang, setLang] = useState([]);
  const [contractStatus, setContractStatus] = useState([]);
  const [nationalityName, setNationalityName] = useState([]);
  const [skill, setSkill] = useState([]);
  const [jobLocation, setJobLocation] = useState([]);

  const [helperName, setHelperName] = useState("");
  const [currNationality, setCurrNationality] = useState("");
  const [currskill, setCurrSkill] = useState([]);
  const [currlanguage, setCurrLanguage] = useState([]);
  const [currContract, setCurrContract] = useState([]);
  const [currLocation, setCurrLocation] = useState([]);
  const [currDate, setDate] = useState(null);
  const [age, setAge] = useState([18, 60])
  const [experience, setExperience] = useState([0, 40]);
  const [jobPosition, setJobPosition] = useState("");
  const [jobType, setJobType] = useState("");
  const [resumeby, setResumeBy] = useState("");
  const [gender, setGender] = useState("");

  // console.log("Skill is : ", currskill);

  // useEffect(() => {

  //   if (isInitialRender) {
  //     setIsInitialRender(false);
  //     return;
  //   }

  //   const urlParams = new URLSearchParams();
  //   urlParams.set('start', "0")
  //   urlParams.set('length', "20")
  //   urlParams.set('helper_name', helperName)
  //   urlParams.set("start_date", currDate)
  //   urlParams.set("job_type_id", jobType)
  //   urlParams.set("country_id", Country)
  //   urlParams.set("position_id", jobPosition)
  //   urlParams.set('nationality_id', currNationality)
  //   urlParams.set('edu_id', currNationality)
  //   urlParams.set('contract_status_id', currContract)
  //   urlParams.set('resume_manager', resumeby)
  //   urlParams.set('gender', gender)
  //   if (currskill > "0") {
  //     urlParams.set('skill_id', currskill)
  //   }
  //   urlParams.set('age_min', age[0])
  //   urlParams.set('age_max', age[1])
  //   urlParams.set('experience_min', experience[0])
  //   urlParams.set('experience_max', experience[1])
  //   urlParams.set('marital_status', currContract)
  //   urlParams.set('order_by', "last_active")
  //   urlParams.set('location_order', "0")
  //   urlParams.set('lang', navigator.languages[2])
  //   const searchQuery = urlParams.toString();
  //   // console.log("SearchQuery : ", searchQuery);

  //   // navigate({
  //   //   pathname: location.pathname,
  //   //   search: `?${searchQuery}`
  //   // });
  // }, [helperName, currNationality, currlanguage, currContract, currLocation, currDate, currskill, age, experience, jobType, jobPosition, gender, resumeby, navigate, isInitialRender, location.pathname]);

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
  }, [])

  const handleOnReset = () => {
    setHelperName("");
    setCurrContract([]);
    setCurrLanguage([]);
    setCurrLocation([]);
    setCurrNationality("");
    setCurrSkill([]);
    setDate("");
    setAge([18, 60]);
    setExperience([0, 40]);
    setJobPosition("")
    setJobType("")
    setResumeBy("")
    setGender("")
    setSearchParams("")
  }

  const handleOnInputChange = (field, value) => {

    const urlParams = new URLSearchParams();

    if (Array.isArray(value) && value.length > 0) {
      urlParams.set(field, value.join(', '));
    } else if (typeof value === 'string' && value.trim() !== '') {
      urlParams.set(field, value.trim());
    }
    // else if (field === 'age' && Array.isArray(value) && value.length === 2) {
    //   // If field is 'age' and value is an array with two elements, set 'age_min' and 'age_max' parameters
    //   urlParams.set('age_min', value[0]);
    //   urlParams.set('age_max', value[1]);
    // } 
    else {
      // If value is empty, remove the field from the URL
      urlParams.delete(field);
    }

    searchParams.forEach((paramValue, paramName) => {
      if (paramName !== field) {
        if (paramName === 'skills') {
          // Ensure 'skills' parameter is added as a comma-separated string
          const skillsValues = searchParams.getAll(paramName);
          if (skillsValues.length > 0) {
            urlParams.append(paramName, skillsValues.join(','));
          }
        } else {
          urlParams.append(paramName, paramValue);
        }
      }
    });

    setSearchParams(urlParams.toString());
  }

  // const handleOnInputChange = (field, value) => {
  //   const params = {};

  //   if (Array.isArray(value) && value.length > 0) {
  //     params[field] = value.join(', ');
  //   } else if (typeof value === 'string' && value.trim() !== '') {
  //     params[field] = value.trim();
  //   }
  //    else if (field === 'age' && Array.isArray(value) && value.length === 2) {
  //     // If field is 'age' and value is an array with two elements, set 'age_min' and 'age_max' parameters
  //     params['age_min'] = value[0];
  //     params['age_max'] = value[1];
  //   }

  //   // Add other parameters from searchParams
  //   searchParams.forEach((paramValue, paramName) => {
  //     if (paramName !== field) {
  //       params[paramName] = paramValue;
  //     }
  //   });

  //   // Construct the query string
  //   let queryString = '';
  //   for (const key in params) {
  //     if (params.hasOwnProperty(key)) {
  //       queryString += `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}&`;
  //     }
  //   }
  //   queryString = queryString.slice(0, -1); // Remove the trailing '&'

  //   // Update the URL search parameters
  //   setSearchParams(queryString);
  // }


  // const handleOnInputChange = (field, value) => {
  //   // Parse the current search parameters into an object
  //   const params = {};
  //   const searchParams = window.location.search.substring(1).split('&');

  //   // Populate the params object with the current search parameters
  //   for (const param of searchParams) {
  //     const [key, val] = param.split('=');
  //     params[key] = val ? decodeURIComponent(val.replace(/\+/g, ' ')) : '';
  //   }

  //   // Update the value for the specified field
  //   if (Array.isArray(value) && value.length > 0) {
  //     params[field] = value.join(',');
  //   } else if (typeof value === 'string' && value.trim() !== '') {
  //     if (field === 'language') {
  //       params[field] = value.split(',').map(item => item.trim()).join(',');
  //     } else {
  //       params[field] = value.trim();
  //     }
  //   } else {
  //     // If value is empty, remove the field
  //     delete params[field];
  //   }

  //   // Construct the new search string
  //   const searchString = Object.entries(params)
  //     .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
  //     .join('&');

  //   // Update the URL with the new search string
  //   window.history.replaceState({}, '', `${window.location.pathname}?${searchString}`);
  // };







  return (
    <div className="w-[30%] rounded-md ps-[15px] pr-[15px] mt-10 pb-5 border-[1px] border-[#9999] bg-[#F9F9F9]">

      <div className="p-2 mt-4">
        <span className="text-primary text-2xl mt-2">{"I'm Looking For"}</span>
      </div>

      <div>

        {/* Filter and reset  */}
        <div className="flex justify-between p-2">
          <span className="font-semibold text-primary text-lg">Filter</span>
          <div className="flex justify-center items-center gap-1 cursor-pointer" onClick={handleOnReset}>
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
                  name="jobposition"
                  checked={jobPosition === "1"}
                  onChange={(e) => {
                    setJobPosition(e.target.value);
                    handleOnInputChange("job_position", "Domestic-Helper")
                  }}
                  className={`form-radio h-5 w-5 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer ${jobPosition === "1" ? 'bg-green-500' : 'bg-blue-600'}`}
                  value="1"
                />
                <span>Domestic Helper</span>
              </div>

              <div className="flex gap-2 justify-start items-center">
                <input
                  type="radio"
                  name="jobposition"
                  checked={jobPosition === "2"}
                  onChange={(e) => {
                    setJobPosition(e.target.value);
                    handleOnInputChange("job_position", "Driver")
                  }}
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="2"
                />
                <span>Driver</span>
              </div>

            </div>

            <div className="flex flex-col gap-3 mt-3">
              <span className="text-primary text-lg font-semibold">Start Date</span>
              <input
                type="date"
                className="border-[1px] border-[#9999] p-2 rounded text-sm text-secondary outline-none"
                onChange={(e) => {
                  setDate(e.target.value)
                  handleOnInputChange("start_date", e.target.value)
                }}
              />
            </div>

            <div className="flex flex-col gap-3 mt-3">
              <span className="text-primary text-lg font-semibold">Candidate Location</span>
              <SelectBox
                currValue={currLocation}
                setCurrValue={setCurrLocation}
                valueArray={jobLocation}
                handleOnChange={(value) => handleOnInputChange("country", value)}
              />
            </div>

          </div>

          {/* job type  */}
          <div className="mt-5 p-2">
            <span className="text-primary font-semibold mt-5">Job Type</span>
            <div className="w-full h-[2px] bg-[#25AE88]"></div>

            <div className="mt-2 flex flex-col gap-3 p-2">
              <div className="flex gap-2 justify-start items-center">
                <input
                  type="radio"
                  name="jobtype"
                  checked={jobType === "1"}
                  onChange={(e) => {
                    setJobType(e.target.value);
                    handleOnInputChange("job_type", "Full-Time")
                  }}
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="1"
                />
                <span>Full Time</span>
              </div>

              <div className="flex gap-2 justify-start items-center">
                <input
                  type="radio"
                  name="jobtype"
                  checked={jobType === "2"}
                  onChange={(e) => {
                    setJobType(e.target.value);
                    handleOnInputChange("job_type", "Part-Time")
                  }}
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="2"
                />
                <span>Part Time</span>
              </div>

              <div className="flex gap-2 justify-start items-center">
                <input
                  type="radio"
                  name="jobtype"
                  checked={jobType === "3"}
                  onChange={(e) => {
                    setJobType(e.target.value);
                    handleOnInputChange("job_type", "Temporary")
                  }}
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="3"
                />
                <span>Temporary</span>
              </div>

            </div>

            <div className="flex flex-col gap-3 mt-3 w-full">
              <span className="text-primary text-lg font-semibold">Contract Status</span>
              <SelectBox
                currValue={currContract}
                setCurrValue={setCurrContract}
                valueArray={contractStatus}
                handleOnChange={(value) => handleOnInputChange("contract_status", value)}
              />
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
                  name="resumby"
                  checked={resumeby === "1"}
                  onChange={(e) => {
                    setResumeBy(e.target.value)
                    handleOnInputChange("post_manager", "Direct")
                  }
                  }
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="1"
                />
                <span>Direct</span>
              </div>

              <div className="flex gap-2 justify-start items-center">
                <input
                  type="radio"
                  name="resumby"
                  checked={resumeby === "2"}
                  onChange={(e) => {
                    setResumeBy(e.target.value)
                    handleOnInputChange("post_manager", "Agency")
                  }
                  }
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

            <div className="mt-2 p-3">
              <Slider
                getAriaLabel={() => 'Temperature range'}
                value={experience}
                onChange={(e, nextValue) => {
                  setExperience(nextValue)
                  handleOnInputChange("experience_range", nextValue)
                }}
                valueLabelDisplay="auto"
                min={0}
                max={40}
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <span className="text-primary text-lg font-semibold">Language</span>
              <SelectBox
                currValue={currlanguage}
                setCurrValue={setCurrLanguage}
                valueArray={lang}
                handleOnChange={(value) => {
                  console.log("value is :", value);
                  handleOnInputChange("Language", value)
                }}
              />
            </div>


            <div className="flex flex-col gap-3 mt-3 w-full">
              <span className="text-primary text-lg font-semibold">Main Skill</span>
              <SelectBox
                currValue={currskill}
                setCurrValue={setCurrSkill}
                valueArray={skill}
                handleOnChange={(value) => handleOnInputChange("Main-Skills", value)}
              />
            </div>

            <div className="flex flex-col gap-3 mt-3">
              <span className="text-primary text-lg font-semibold">Nationality</span>

              <FormControl className="w-full">
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={currNationality}
                  onChange={(e) => {
                    setCurrNationality(e.target.value)
                    handleOnInputChange("nationality", e.target.value)
                  }}
                  className="w-full h-10"
                  style={{ color: "grey", fontFamily: "poppins", fontStyle: "thin", backgroundColor: "trnsperant", flex: "auto" }}
                >
                  {nationalityName.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={{ fontFamily: "poppins" }}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                  name="gender"
                  checked={gender === "1"}
                  onChange={(e) => {
                    setGender(e.target.value)
                    handleOnInputChange("gender", "Male")
                  }
                  }
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="1"
                />
                <span>Male</span>
              </div>

              <div className="flex gap-2 justify-start items-center">
                <input
                  type="radio"
                  name="gender"
                  checked={gender === "2"}
                  onChange={(e) => {
                    setGender(e.target.value)
                    handleOnInputChange("gender", "Female")
                  }
                  }
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

            <div className="mt-3 w-full p-3">
              <Slider
                value={age}
                onChange={(e, newValue) => {
                  setAge(newValue)
                  console.log(newValue);
                  handleOnInputChange('age_range', newValue);
                }}
                valueLabelDisplay="auto"
                min={18}
                max={60}
              />
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-primary text-lg font-semibold">Helper Name</span>
              <div className="border-[1px] w-full border-[#9999] rounded flex justify-between items-center pr-5">
                <input type="text" placeholder="Search with Helper Name" className=" p-2  text-sm text-secondary outline-none" value={helperName} onChange={(e) => {
                  setHelperName(e.target.value)
                  handleOnInputChange("name", e.target.value)
                }
                }
                />
                <IoSearchOutline className="text-[#3a3a3a99] h-5 w-5" />
              </div>
            </div>

          </div>

        </div>
        
      </div>

    </div>
  )
}

export default Filter
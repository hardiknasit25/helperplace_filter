import { MdOutlineRefresh } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import SelectBox from "../SelectFiled/SelectBox";
import { FormControl, MenuItem, Select, Slider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addData, addLocation, addLanguage, addSkills, addNationality, addContract, addParamsData } from "../../features/dataSlice";

function Filter() {

  const dispatch = useDispatch();
  // const Masterdata = useSelector((state) => state.data)
  const lang = useSelector((state) => state.Language)
  const skill = useSelector((state) => state.Skills)
  const jobLocation = useSelector((state) => state.Locations)
  const contractStatus = useSelector((state) => state.contract)
  const nationalityName = useSelector((state) => state.nationality)
  const searchData = useSelector((state) => state.paramsData)
  const [searchParams, setSearchParams] = useSearchParams();
  const [helperName, setHelperName] = useState(searchData.helper_name);
  const [currNationality, setCurrNationality] = useState("");
  const [currskill, setCurrSkill] = useState([]);
  const [currlanguage, setCurrLanguage] = useState([]);
  const [currContract, setCurrContract] = useState([]);
  const [currLocation, setCurrLocation] = useState([]);
  const [currDate, setDate] = useState("");
  const [age, setAge] = useState([18, 60])
  const [experience, setExperience] = useState([0, 40]);
  const [jobPosition, setJobPosition] = useState(false);
  const [jobType, setJobType] = useState("");
  const [resumeby, setResumeBy] = useState("");
  const [gender, setGender] = useState("");


  function convertStringToArray(string) {
    return string.split(',').map(language => language.trim());
  }

  let languagesArray = []
  const langIndices = [];
  if (searchData.language && searchData.language.length > 0) {
    languagesArray = convertStringToArray(searchData.language[0]);
  } else {
    // console.log('searchData.language is not defined or empty');
  }
  for (let i = 0; i < languagesArray.length; i++) {
    for (let j = 0; j < lang.length; j++) {
      if (languagesArray[i] === lang[j]) {
        langIndices.push(j);
        break;
      }
    }
  }

  // console.log("language index :", langIndices);

  // console.log(searchData);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    const data = {
      job_position: queryParams.get('job_position') || '',
      job_type: queryParams.get('job_type') || '',
      resumeby: queryParams.get('post_manager') || '',
      nationality: queryParams.get('nationality') || '',
      gender: queryParams.get('gender') || '',
      helper_name: queryParams.get('name') || '',
      date: queryParams.get('start_date') || '',
      country: queryParams.getAll('country') || [],
      experience: queryParams.get('experience_range') ? queryParams.get('experience_range').split('-').map(Number) : [0, 40],
      age: queryParams.get('age_range') ? queryParams.get('age_range').split('-').map(Number) : [18, 60],
      language: queryParams.getAll('Language') || [],
      currskill: queryParams.getAll('Main-Skills') || [],
      currContract: queryParams.getAll('contract_status') || []
    };

    setHelperName(data.helper_name);
    setCurrNationality(data.nationality);
    setCurrSkill(data.currskill);
    setCurrLanguage(data.language);
    setCurrContract(data.currContract);
    setCurrLocation(data.country);
    setDate(data.date);
    setAge(data.age);
    setExperience(data.experience);
    setJobPosition(data.job_position);
    setJobType(data.job_type);
    setResumeBy(data.resumeby);
    setGender(data.gender);

    dispatch(addParamsData(data));
  }, [dispatch, searchParams]);

  useEffect(() => {
    fetch("/api/mobile/masterdata/GetAllMasterDataJson")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        dispatch(addData(data))
        if (data && data.data.language && data.data.contract_status && data.data.nationality && data.data.skills && data.data.job_location) {
          const languages = data.data.language.map(language => language.language_name);
          const contract_status = data.data.contract_status.map((contract) => contract.contract_sts_name);
          const nationality = data.data.nationality.map(nationality => nationality.nationality_name)
          const skills = data.data.skills.map(skills => skills.skill_name)
          const jobLocations = data.data.job_location.map(joblocation => joblocation.location_name)
          dispatch(addLanguage(languages))
          dispatch(addLocation(jobLocations))
          dispatch(addSkills(skills))
          dispatch(addNationality(nationality))
          dispatch(addContract(contract_status))
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
    } else {
      urlParams.delete(field);
    }

    searchParams.forEach((paramValue, paramName) => {
      if (paramName !== field) {
        if (paramName === 'skills') {
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
    <div className="w-[30%] h-[70%] rounded-md ps-[15px] pr-[15px] mt-10 pb-5 border-[1px] border-[#9999] bg-[#F9F9F9]">

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
                  checked={jobPosition === "Domestic-Helper"}
                  onChange={(e) => {
                    setJobPosition(e.target.value);
                    handleOnInputChange("job_position", "Domestic-Helper")
                  }}
                  className={`form-radio h-5 w-5 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer ${jobPosition === "1" ? 'bg-green-500' : 'bg-blue-600'}`}
                  value="Domestic-Helper"
                />
                <span>Domestic Helper</span>
              </div>

              <div className="flex gap-2 justify-start items-center">
                <input
                  type="radio"
                  name="jobposition"
                  checked={jobPosition === "Driver"}
                  onChange={(e) => {
                    setJobPosition(e.target.value);
                    handleOnInputChange("job_position", "Driver")
                  }}
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="Driver"
                />
                <span>Driver</span>
              </div>

            </div>

            <div className="flex flex-col gap-3 mt-3">
              <span className="text-primary text-lg font-semibold">Start Date</span>
              <input
                type="date"
                className="border-[1px] border-[#9999] p-2 rounded text-sm text-secondary outline-none bg-transparent"
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
                selectedValues={searchData.country}
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
                  checked={jobType === "Full-Time"}
                  onChange={(e) => {
                    setJobType(e.target.value);
                    handleOnInputChange("job_type", "Full-Time")
                  }}
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="Full-Time"
                />
                <span>Full Time</span>
              </div>

              <div className="flex gap-2 justify-start items-center">
                <input
                  type="radio"
                  name="jobtype"
                  checked={jobType === "Part-Time"}
                  onChange={(e) => {
                    setJobType(e.target.value);
                    handleOnInputChange("job_type", "Part-Time")
                  }}
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="Part-Time"
                />
                <span>Part Time</span>
              </div>

              <div className="flex gap-2 justify-start items-center">
                <input
                  type="radio"
                  name="jobtype"
                  checked={jobType === "Temporary"}
                  onChange={(e) => {
                    setJobType(e.target.value);
                    handleOnInputChange("job_type", "Temporary")
                  }}
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="Temporary"
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
                selectedValues={searchData.currContract}
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
                  checked={resumeby === "Direct"}
                  onChange={(e) => {
                    setResumeBy(e.target.value)
                    handleOnInputChange("post_manager", "Direct")
                  }
                  }
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="Direct"
                />
                <span>Direct</span>
              </div>

              <div className="flex gap-2 justify-start items-center">
                <input
                  type="radio"
                  name="resumby"
                  checked={resumeby === "Agency"}
                  onChange={(e) => {
                    setResumeBy(e.target.value)
                    handleOnInputChange("post_manager", "Agency")
                  }
                  }
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="Agency"
                />
                <span>Agency</span>
              </div>
            </div>
          </div>

          {/* Working Experience */}
          <div className="mt-5 p-2">
            <span className="text-primary font-semibold mt-5">Working Experience</span>
            <div className="w-full h-[2px] bg-[#25AE88]"></div>

            <div className="mt-2 p-3">
              <Slider
                min={0}
                max={40}
                value={experience}
                onChange={(e, newValue) => {
                  setExperience(newValue)
                  handleOnInputChange("experience_range", newValue.join('-'))
                }}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <span className="text-primary text-lg font-semibold">Language</span>
              <SelectBox
                currValue={currlanguage}
                setCurrValue={setCurrLanguage}
                valueArray={lang}
                selectedValues={searchData.language}
                languageIndex = {langIndices}
                handleOnChange={(value) => {
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
                selectedValues = {searchData.currSkill}
                handleOnChange={(value) => handleOnInputChange("Main-Skills", value)}
              />
            </div>

            <div className="flex flex-col gap-3 mt-3">
              <span className="text-primary text-lg font-semibold">Nationality</span>

              <FormControl className="w-[300px]">
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
                  checked={gender === "Male"}
                  onChange={(e) => {
                    setGender(e.target.value)
                    handleOnInputChange("gender", "Male")
                  }
                  }
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="Male"
                />
                <span>Male</span>
              </div>

              <div className="flex gap-2 justify-start items-center">
                <input
                  type="radio"
                  name="gender"
                  checked={gender === "Female"}
                  onChange={(e) => {
                    setGender(e.target.value)
                    handleOnInputChange("gender", "Female")
                  }
                  }
                  className="form-radio h-5 w-5 text-blue-600 transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-grey-600/50 cursor-pointer"
                  value="Female"
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
                  handleOnInputChange('age_range', newValue.join('-'));
                }}
                valueLabelDisplay="auto"
                min={18}
                max={60}
                aria-labelledby="range-slider"
              />
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-primary text-lg font-semibold">Helper Name</span>
              <div className="border-[1px] w-full border-[#9999] rounded flex justify-between items-center pr-5">
                <input type="text" placeholder="Search with Helper Name" className="p-2 text-sm text-secondary outline-none bg-transparent" value={helperName} onChange={(e) => {
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
import { MdOutlineRefresh } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import SelectBox from "../SelectFiled/SelectBox";
import { FormControl, MenuItem, Select, Slider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addData, addLocation, addLanguage, addSkills, addNationality, addContract, addParamsData, addCandidateCountry, addOrder, addPage } from "../../features/dataSlice";

function Filter() {

  const dispatch = useDispatch();
  const lang = useSelector((state) => state.Language)
  const skill = useSelector((state) => state.Skills)
  // const jobLocation = useSelector((state) => state.Locations)
  const contractStatus = useSelector((state) => state.contract)
  const nationalityName = useSelector((state) => state.nationality)
  const searchData = useSelector((state) => state.paramsData)
  const order = useSelector((slice) => slice.order);
  const page = useSelector((slice) => slice.page);
  const candidateCountry = useSelector((slice) => slice.candidateCountry);
  const [searchParams, setSearchParams] = useSearchParams();
  const [helperName, setHelperName] = useState(searchData.helper_name);
  const [currNationality, setCurrNationality] = useState('');
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

  const [languageArray, setLanguageArray] = useState([])
  const [locationArray, setLocationArray] = useState([])
  const [contractArray, setContractArray] = useState([])
  const [skillsArray, setSkillsArray] = useState([])
  const [nationalityArray, setNationalityArray] = useState([])

  function convertStringToArray(string) {
    let lowerstring = string.toLowerCase();
    return lowerstring.split(',').map(language => language.trim());
  }

  useEffect(() => {
    const languageNames = lang.map((item) => item.language_name.toLowerCase());
    const locationNames = candidateCountry.map((item) => item.country_name.toLowerCase());
    const nationalityNames = nationalityName.map((item) => item.nationality_name.toLowerCase());
    const contractStatusNames = contractStatus.map((item) => item.contract_sts_name.toLowerCase());
    const skillsNames = skill.map((item) => item.skill_name.toLowerCase());

    setLanguageArray(languageNames);
    setLocationArray(locationNames);
    setNationalityArray(nationalityNames);
    setContractArray(contractStatusNames);
    setSkillsArray(skillsNames)
  }, [lang, candidateCountry, nationalityName, contractStatus, skill]);

  // useEffect(() => {
  //   console.log("locations :",locationArray);
  //   console.log("Languages :",languageArray);
  //   console.log("contractStatus :",contractArray);
  //   console.log("Skills :", skillsArray);
  //   console.log("nationality :", nationalityArray);
  // }, [languageArray,locationArray,contractArray,skillsArray,nationalityArray]);

  // function convertStringToArray(string) {
  //   return string.split(',').map(language => language.trim());
  // }

  // let languagesArray = []
  // const langIndices = [];
  // if (searchData.language && searchData.language.length > 0) {
  //   languagesArray = convertStringToArray(searchData.language[0]);
  // } else {
  //   // console.log('searchData.language is not defined or empty');
  // }
  // for (let i = 0; i < languagesArray.length; i++) {
  //   for (let j = 0; j < lang.length; j++) {
  //     if (languagesArray[i] === lang[j]) {
  //       langIndices.push(j);
  //       break;
  //     }
  //   }
  // }

  // console.log("language index :", langIndices);

  // console.log(searchData);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    const country = queryParams.getAll('country') || []
    let countryArray = []
    if (country && country.length > 0) {
      countryArray = convertStringToArray(country[0]);
    } else {
      // console.log('searchData.country is not defined or empty');
    }

    const language = queryParams.getAll('Language') || []
    let languagesArray = []
    if (language && language.length > 0) {
      languagesArray = convertStringToArray(language[0]);
    } else {
      // console.log('searchData.language is not defined or empty');
    }

    const currskill = queryParams.getAll('Main-Skills') || []
    let skillsArray = []
    if (currskill && currskill.length > 0) {
      skillsArray = convertStringToArray(currskill[0]);
    } else {
      // console.log('searchData.country is not defined or empty');
    }

    const currContract = queryParams.getAll('contract_status') || []
    let contractArray = [];
    if (currContract && currContract.length > 0) {
      contractArray = convertStringToArray(currContract[0]);
    } else {
      // console.log('searchData.country is not defined or empty');
    }

    const data = {
      job_position: queryParams.get('job_position') || '',
      job_type: queryParams.get('job_type') || '',
      resumeby: queryParams.get('post_manager') || '',
      nationality: queryParams.get('nationality') || '',
      gender: queryParams.get('gender') || '',
      helper_name: queryParams.get('name') || '',
      date: queryParams.get('start_date') || '',
      order: queryParams.get('order_by') || '',
      page: queryParams.get('page') || '',
      country: countryArray,
      experience: queryParams.get('experience_range') ? queryParams.get('experience_range').split('-').map(Number) : [0, 40],
      age: queryParams.get('age_range') ? queryParams.get('age_range').split('-').map(Number) : [18, 60],
      language: languagesArray,
      currskill: skillsArray,
      currContract: contractArray
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
    dispatch(addOrder(data.order));
    dispatch(addPage(data.page));
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
          // const languages = data.data.language.map(language => language.language_name);
          const languages = data.data.language.map(language => language);
          const contract_status = data.data.contract_status.map((contract) => contract);
          const nationality = data.data.nationality.map(nationality => nationality)
          const skills = data.data.skills.map(skills => skills)
          const jobLocations = data.data.job_location.map(joblocation => joblocation)
          const candidateCountry = data.data.candidate_country.map(candidateCountry => candidateCountry)
          dispatch(addLanguage(languages))
          dispatch(addLocation(jobLocations))
          dispatch(addSkills(skills))
          dispatch(addNationality(nationality))
          dispatch(addContract(contract_status))
          dispatch(addCandidateCountry(candidateCountry))
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
    urlParams.set("page", "1");

    if (Array.isArray(value) && value.length > 0) {
      urlParams.set(field, value.join(', '));
    } else if (typeof value === 'string' && value.trim() !== '') {
      urlParams.set(field, value.trim());
    } else if (typeof value === 'number') {
      urlParams.set(field, value.toString());
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

  useEffect(() => {
    handleOnInputChange("order_by", order)
  }, [order])

  useEffect(() => {
    handleOnInputChange("page", page)
  }, [page])

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleOnInputChange("name", helperName)
  }

  return (
    <div className="w-[30%] h-[70%] rounded-md ps-[15px] pr-[15px] mt-16 pb-5 border-[1px] border-[#9999] bg-[#F9F9F9]">

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
                  checked={jobPosition == "Domestic-Helper"}
                  onChange={(e) => {
                    setJobPosition(e.target.checked);
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
                valueArray={locationArray}
                selectedValues={searchData.country}
                placeholder={'Candidate Location'}
                handleOnChange={(value) => {
                  handleOnInputChange("country", value)
                }}
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
                valueArray={contractArray}
                placeholder={'Contract Status'}
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
                valueArray={languageArray}
                placeholder={'Search'}
                selectedValues={searchData.language}
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
                valueArray={skillsArray}
                placeholder={'Search'}
                selectedValues={searchData.currSkill}
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
                  displayEmpty
                  onChange={(e) => {
                    setCurrNationality(e.target.value)
                    handleOnInputChange("nationality", e.target.value)
                  }}
                  className="w-full h-10"
                  style={{ color: "grey", fontFamily: "poppins", fontStyle: "thin", backgroundColor: "trnsperant", flex: "auto" }}
                >
                  <MenuItem value="">
                    <em>Any Nationality</em>
                  </MenuItem>
                  {nationalityArray.map((name) => (
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
              <form onSubmit={handleOnSubmit} className="border-[1px] w-full border-[#9999] rounded flex justify-between items-center pr-5">
                <input type="text" placeholder="Search with Helper Name" className="p-2 text-sm text-secondary outline-none bg-transparent" value={helperName}
                  onChange={(e) => {
                    setHelperName(e.target.value)
                  }}
                />
                <IoSearchOutline className="text-[#3a3a3a99] h-5 w-5" />
              </form>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Filter
import { useEffect, useState } from 'react';
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import NotFound from './NotFound';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { addPage } from '../../features/dataSlice';

function People() {

  const [clientData, setClientData] = useState([])
  const [clientDataRecords, setClientDataRecords] = useState('');

  const searchData = useSelector((state) => state.paramsData)
  const lang = useSelector((state) => state.Language)
  // const Locations = useSelector((state) => state.Locations)
  const Skills = useSelector((state) => state.Skills)
  const contract = useSelector((state) => state.contract)
  const nationalityList = useSelector((state) => state.nationality)
  const candidateCountry = useSelector((state) => state.candidateCountry)
  const order = useSelector((state) => state.order)

  const dispatch = useDispatch();

  const params = new URLSearchParams(location.search);
  const initialPage = parseInt(params.get('page')) || 1;

  // const [currentPage, setCurrentPage] = useState(initialPage);
  // const [clientsPerPage] = useState(20); // Number of clients per page


  const [currentPage, setCurrentPage] = useState(initialPage);
  const [clientsPerPage] = useState(20); // Number of clients per page

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clientData.slice(indexOfFirstClient, indexOfLastClient);

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(addPage(currentPage));
  }, [currentPage, dispatch]);

  //get Clint Country name from country code which provided by response from API
  const getLocationName = (locationId) => {
    const location = candidateCountry.find((item) => item.country_id === locationId);
    return location ? location.country_name : '';
  };

  const getContractName = (contractId) => {
    const contractName = contract.find((item) => item.contract_sts_id === contractId);
    return contractName ? contractName.contract_sts_name : '';
  };

  // convert date into short form
  const getDate = (date) => {
    const originalDate = new Date(date);
    const formattedDate = originalDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return formattedDate
  }

  // covert language into array and get a index***************************  
  const langIndices = [];
  for (let i = 0; i < searchData.language.length; i++) {
    lang.map((item) => {
      if (item.language_name.toLowerCase() === searchData.language[i])
        langIndices.push(item.language_id)
    })
  }
  // const serializedLanguageArray = langIndices.join(',');

  // covert country into array and get a index**************************
  const countryIndices = [];
  for (let i = 0; i < searchData.country.length; i++) {
    candidateCountry.map((item) => {
      if (item.country_name.toLowerCase() === searchData.country[i])
        countryIndices.push(item.country_id)
    })
  }
  const serializedCountryArray = countryIndices.join(',');

  // covert Skills into array and get a index**************************  
  const skillsIndices = [];
  for (let i = 0; i < searchData.currskill.length; i++) {
    Skills.map((item) => {
      if (item.skill_name.toLowerCase() === searchData.currskill[i])
        skillsIndices.push(item.skill_id)
    })
  }
  const serializedSkillsArray = skillsIndices.join(',');

  // covert Contract into array and get a index**************************  
  const contractIndices = [];
  for (let i = 0; i < searchData.currContract.length; i++) {
    contract.map((item) => {
      if (item.contract_sts_name.toLowerCase() === searchData.currContract[i])
        contractIndices.push(item.contract_sts_id)
    })
  }
  const serializedContractArray = contractIndices.join(',');

  //find index of nationality 
  let nationalityIndices = "";
  nationalityList.map((item) => {
    if (item.nationality_name === searchData.nationality)
      nationalityIndices = item.nationality_id;
  })

  //generate SearchURL 
  const urlParams = new URLSearchParams();
  urlParams.set('start', (currentPage - 1))
  urlParams.set('length', clientsPerPage)
  urlParams.set('helper_name', searchData.helper_name)
  urlParams.set("start_date", searchData.date)
  urlParams.set("job_type_id",
    searchData.job_type === "Full-Time" ? "1" :
      searchData.job_type === "Part-Time" ? "2" :
        searchData.job_type === "Temporary" ? "3" : ""
  );
  urlParams.set("country_id", serializedCountryArray)
  urlParams.set("position_id",
    searchData.job_position === "Domestic-Helper" ? "1" :
      searchData.job_position === "Driver" ? "2" : ""
  )
  urlParams.set('nationality_id', nationalityIndices)
  urlParams.set('edu_id', "")
  urlParams.set('contract_status_id', serializedContractArray)
  urlParams.set('resume_manager',
    searchData.resumeby === "Direct" ? "1" :
      searchData.resumeby === "Agency" ? "2" : "")
  urlParams.set('gender',
    searchData.gender === "Male" ? "1" :
      searchData.gender === "Female" ? "2" : ""
  )
  urlParams.set('skill_id', serializedSkillsArray)
  urlParams.set('age_min', searchData.age[0])
  urlParams.set('age_max', searchData.age[1])
  urlParams.set('experience_min', searchData.experience[0])
  urlParams.set('experience_max', searchData.experience[1])
  urlParams.set('marital_status', "")
  urlParams.set('order_by', order)
  urlParams.set('location_order', "0")
  urlParams.set('lang', navigator.languages[2])
  const searchQuery = urlParams.toString();
  console.log(searchQuery);

  //Fetch client data
  useEffect(() => {
    // Fetch data only if searchQuery is not empty
    if (searchQuery !== '') {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://api.helperplace.com/api/mobile/candidate/FindCandidate?${searchQuery}`);
          if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
          }
          const data = await response.json();
          setClientData(data.data);
          setClientDataRecords(data.records_total);
        } catch (error) {
          console.error('Fetch error: ', error);
        }
      };

      fetchData();
    }
  }, [searchQuery]); // Only run useEffect when searchQuery changes


  // function useDebounce(callback, delay) {
  //   const timeoutRef = useRef(null);

  //   return (...args) => {
  //     clearTimeout(timeoutRef.current);
  //     timeoutRef.current = setTimeout(() => {
  //       callback(...args);
  //     }, delay);
  //   };
  // }

  // const debouncedFetchData = useDebounce(async () => {
  //   try {
  //     const response = await fetch(`https://api.helperplace.com/api/mobile/candidate/FindCandidate${"?" + searchQuery}`);
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok: ' + response.statusText);
  //     }
  //     const data = await response.json();
  //     setClientData(data.data);
  //   } catch (error) {
  //     console.error('Fetch error: ', error);
  //   }
  // }, 500); // Adjust the delay according to your requirements

  // useEffect(() => {
  //   debouncedFetchData();
  // }, [searchQuery]);

  return (
    <div className="w-full mt-16">

      {clientData.length > 0 ? clientData.map((client) => (
        <div className="h-[213px] flex gap-2 shadow-2xl pt-2 pb-2 rounded-sm mb-5" style={{ boxShadow: "grey" }} key={client.resume_id}>
          {/* Photo  */}
          < div className="w-[165px] h-[213px] flex flex-col justify-center items-center gap-3" >
            <div className="h-[145px] w-[165px] flex justify-center items-center p-1">
              <img src={client.profile_photo} alt='profile_image' className='h-[143px] w-[143px] rounded-full overflow-hidden items-center' />
            </div>
            <div className="h-[38px] w-[165px] flex flex-col justify-center items-start mt-1">
              <div style={{ clipPath: 'polygon(0 0, 100% 0, 90% 50%, 100% 100%, 0% 100%)', backgroundColor: "var(--primary-color)" }} color='primary' className='w-[128.45px] h-[30px] flex justify-center items-center'>
                <p className='text-white font-normal'>{client.resume_manager}</p>
              </div>
              <div className='w-[128.45px] h-[2px] bg-[#EBBA16]'></div>
            </div>
          </div>

          <div className="p-2 flex flex-col">
            <div className='w-full h-[150px] p-[10px] flex flex-col'>
              <h4 className="text-primary font-semibold text-[18px]"> {client.helper_name} <span>- {client.age}yr</span></h4>

              <div className="flex gap-5 mt-2">
                <span className="text-secondary font-semibold text-[16px]">{client.position_id === "1" ? "Domestic Helper" : (client.position_id === 1 ? "Domestic Helper " : "Driver ")}
                  <span>- {getContractName(client.contract_status_id)} </span></span>
                <div className='flex justify-center items-center gap-1'>
                  <FaLocationDot className='text-[#25AE88]' />
                  <span className="text-primary font-semibold text-[16px]">{getLocationName(client.current_country_id)}</span>
                </div>
              </div>

              <span className="mt-2 text-[14px]"> {client.meta_data}</span>
            </div>

            <div className="flex mt-4 gap-10 h-[30px] justify-start items-center">
              <div className='flex justify-center items-center gap-2'>
                <div className='w-4 h-4 bg-[#25AE88] rounded-full'></div>
                <span className="text-primary font-semibold">{client.experience_year}yr experience</span>
              </div>

              <div className='flex gap-2 justify-center items-center'>
                <FaCalendarAlt className='text-[#25AE88]' />
                <span className="text-primary font-semibold">From {getDate(client.next_job_available_date)} | {client.job_type_id === "1" ? "Full Time" : (client.job_type_id === 1 ? "Full Time" : client.job_type_id === 2 ? "Part Time" : client.job_type_id === 3 ? "Temporary" : "")}</span>
              </div>

              {/* {client.very_active === '1' && ( */}
              <div className='flex justify-center items-center gap-2'>
                <div className='w-4 h-4 bg-[#25AE88] rounded-full'></div>
                <span className="text-[#25AE88] font-semibold">Very Active</span>
              </div>
              {/* // )} */}

            </div>
          </div>
        </div >
      )) : <NotFound />}

      <div className='mt-5 mb-5 flex justify-center items-center'>
        <Stack spacing={1}>
          <Pagination
            count={Math.ceil(clientDataRecords / clientsPerPage)}
            variant="outlined"
            shape="rounded"
            page={currentPage}
            onChange={handleChangePage}
          />
        </Stack>
      </div>

    </div>
  )
}

export default People
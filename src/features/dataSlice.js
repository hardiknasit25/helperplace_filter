import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  Locations: [],
  Language: [],
  Skills: [],
  contract: [],
  nationality: [],
  candidateCountry: [],
  order: '',
  paramsData: {
    job_position: "",
    job_type: "",
    resumeby: "",
    nationality: "",
    gender: "",
    helper_name: "",
    date: "",
    country: [],
    experience: [],
    age: [],
    language: [],
    currskill: [],
    currContract: []
  }
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addData: (state, action) => { state.data = action.payload },
    addLocation: (state, action) => { state.Locations = action.payload },
    addLanguage: (state, action) => { state.Language = action.payload },
    addSkills: (state, action) => { state.Skills = action.payload },
    addContract: (state, action) => { state.contract = action.payload },
    addNationality: (state, action) => { state.nationality = action.payload },
    addCandidateCountry: (state, action) => { state.candidateCountry = action.payload },
    addOrder: (state, action) => { state.order = action.payload },
    addParamsData: (state, action) => {
      state.paramsData = {
        job_position: action.payload.job_position,
        job_type: action.payload.job_type,
        resumeby: action.payload.resumeby,
        nationality: action.payload.nationality,
        gender: action.payload.gender,
        helper_name: action.payload.helper_name,
        date: action.payload.date,
        country: action.payload.country,
        experience: action.payload.experience,
        age: action.payload.age,
        language: action.payload.language,
        currskill: action.payload.currskill,
        currContract: action.payload.currContract
      }
    }
  }
})

export const { addData, addLocation, addLanguage, addSkills, addNationality, addContract, addParamsData, addCandidateCountry, addOrder } = dataSlice.actions

export default dataSlice.reducer

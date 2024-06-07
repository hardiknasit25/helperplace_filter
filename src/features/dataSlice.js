import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  Locations: [],
  Language: [],
  Skills: [],
  contract: [],
  nationality: []
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addData: (state,action) => {state.data = action.payload },
    addLocation: (state, action) => { state.Locations = action.payload },
    addLanguage: (state, action) => { state.Language = action.payload },
    addSkills: (state, action) => { state.Skills = action.payload },
    addContract: (state, action) => { state.contract = action.payload },
    addNationality: (state, action) => { state.nationality = action.payload }
  }
})

export const {addData, addLocation, addLanguage, addSkills, addNationality, addContract} = dataSlice.actions

export default dataSlice.reducer

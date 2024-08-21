import { createSlice } from "@reduxjs/toolkit";

const initialState = {city:""}
const cityslice = createSlice({
    name:"city",
    initialState,
    reducers:{
        changeCity:(state,action)=>{
            state.city = action.payload
        }
    }
})

export const {changeCity} = cityslice.actions
export default cityslice.reducer;
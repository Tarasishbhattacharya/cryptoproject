
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const getCoin=createAsyncThunk("/coin",async()=>{
  const res= await axios.get('https://api.coincap.io/v2/assets');
  return res?.data?.data
})


export const initialState={
    isLoading:false,
    isError:false,
    coinData:[]
}

export const coinSlice=createSlice({
    name:"coin",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getCoin.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getCoin.fulfilled,(state,{payload})=>{
            state.isLoading=false
            state.coinData=payload
        })
        .addCase(getCoin.rejected,(state,{payload})=>{
            state.isLoading=false
            state.isError=true
        })

    }
})
export default coinSlice.reducer
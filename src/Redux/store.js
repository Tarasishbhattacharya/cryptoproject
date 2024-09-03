import { configureStore } from "@reduxjs/toolkit"
import coinSlice  from "./Cryptoslice"

export const store=configureStore({
    reducer:{
        coin:coinSlice
    }
})
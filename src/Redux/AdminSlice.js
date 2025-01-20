import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from '../api/axiosInstance'
import { endPoints } from "../api/URL";

const initial_value = {
    isLoading: false,
    status: 0,
    data: [],
    error: null
}

let api = endPoints.admin;

export const fetchadminlogin = createAsyncThunk("admin/fetchadminlogin",
    async () => {
        const result = await AxiosInstance.get(api)
        console.log("Axios Response for admin Api:", result);
        return result?.data;
    }
)

export const adminSlice = createSlice({
    name: "admin",
    initialState: initial_value,

    extraReducers: (builder) => {

        // SignIn
        builder.addCase(fetchadminlogin.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchadminlogin.fulfilled, (state, action) => {
            
            
                state.isLoading = false;
                state.status = action.payload.status;
                state.data = action.payload.data;
            
        })
        builder.addCase(fetchadminlogin.rejected, (state, action) => {
            // console.log("Action for Rejected:", action);
            state.isLoading = false;
            // console.log("Action: ", action);
            state.error = action.error.message;
        })

     
    }
});
export default adminSlice.reducer;

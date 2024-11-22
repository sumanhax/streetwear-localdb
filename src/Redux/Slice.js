import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from '../api/axiosInstance'
import { endPoints } from "../api/URL";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";

let api = endPoints.user;


const initial_value = {
    isLoading: false,
    status: 0,
    data: [],
    error: null
}

export const fetchsignup = createAsyncThunk("user/fetchsignup",
    async (userdata) => {
        const result = await AxiosInstance.post(api, userdata)
        console.log("Axios Response for signup Api:", result);
        return result?.data;
    }
)

export const fetchsignin = createAsyncThunk("user/fetchsignin",
    async () => {
        const result = await AxiosInstance.get(api);
        // console.log("Axios Response for Login Api");
        return result?.data;
        
        
    }
)

export const fetchprofile = createAsyncThunk("user/fetchprofile",
    async (id) => {
        const result = await AxiosInstance.get(`${api}/${id}`)
        console.log("Axios response for profile:", result.data);
        return result?.data;
    }
)

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (userdata) => {
      // console.log("slice id",userdata);
      const result = await axiosInstance.put(`${api}/${userdata.newid}`,userdata.newData);
      console.log("Axios Response for update profile Api:", result);
      return result?.data;
    }
  );

export const fetchUser = createAsyncThunk("user/fetchUser",
    async () => {
        const result = await AxiosInstance.get(api)
        console.log("Axios response for user:", result.data);
        return result?.data;
    }
)


export const authSlice = createSlice({
    name: "user",
    initialState: initial_value,

    extraReducers: (builder) => {

        // SignUP
        builder.addCase(fetchsignup.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchsignup.fulfilled, (state, action) => {
            // console.log("Action for fulfilled:",action);
            
                state.isLoading = false;
                state.status = action.payload.status;
                state.data = action.payload.data;
            
        })
        builder.addCase(fetchsignup.rejected, (state, action) => {
            //console.log("Action for Rejected:", action);
            state.isLoading = false;
            //console.log("Action: ", action);
            state.error = action.error.message;
        })

        // SignIn
        builder.addCase(fetchsignin.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchsignin.fulfilled, (state, action) => {
            // console.log("Action for fulfilled:",action);
            if (action.payload.status === 200) {
                state.isLoading = false;
                state.status = action.payload.status;
                state.data = action.payload.data;
            }
        })
        builder.addCase(fetchsignin.rejected, (state, action) => {
            // console.log("Action for Rejected:", action);
            state.isLoading = false;
            // console.log("Action: ", action);
            state.error = action.error.message;
        })

        // profile
        builder.addCase(fetchprofile.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchprofile.fulfilled, (state, action) => {
            // console.log("Action for fulfilled:",action);
            if (action.payload.status === 200) {
                state.isLoading = false;
                state.status = action.payload.status;
                state.data = action.payload.data;
            }
        })
        builder.addCase(fetchprofile.rejected, (state, action) => {
            //console.log("Action for Rejected:", action);
            state.isLoading = false;
            //console.log("Action: ", action);
            state.error = action.error.message;
        })
    }
});
export default authSlice.reducer;



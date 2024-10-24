import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/apiService";

// 동네의 좌표. (현재좌표아님)
const initialState = {
	position: {
		lat: 0,
		lng: 0,
	},
	address: "",
	isLoading: false,
	error: null,
};
// 서버로 좌표를 넘겨 지역명을 받음
export const fetchRegionName = createAsyncThunk("forecast/fetchRegionName", async ({ lat, lng }) => {
	const response = await apiClient.get(`/forecast/region?lat=${lat}&lng=${lng}`);
	return response.data;
});

// 지역명을 검색해서 좌표를 얻음
export const searchRegion = createAsyncThunk("forecast/searchRegion", async (neighborhood) => {
	const response = await apiClient.get(`/forecast/region?neighborhood=${neighborhood}`);
	return response.data;
});

const forecastSlice = createSlice({
	name: "region",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		//  지역명을 받음
		builder.addCase(fetchRegionName.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchRegionName.fulfilled, (state, action) => {
			state.isLoading = false;
			state.position = action.payload.position;
			state.address = action.payload.regionName;
			console.log("위치정보 얻어옴");
		});
		builder.addCase(fetchRegionName.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		});
		// 동네 검색
		builder.addCase(searchRegion.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(searchRegion.fulfilled, (state, action) => {
			state.isLoading = false;
			state.shortTerm = action.payload.shortTermList;
		});
		builder.addCase(searchRegion.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		});
	},
});

export default forecastSlice.reducer;

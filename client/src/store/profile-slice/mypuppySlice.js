import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/apiService";

const initialState = {
	dogName: "",
	size: "",
	etc: {
		northern: false,
		brachycephalic: false,
		seniorOrJunior: false,
	},
	isLoading: false,
};

export const fetchMyPuppy = createAsyncThunk("mypuppy/fetchMyPuppy", async () => {
	const response = await apiClient.get(`/profile/mypuppy`);
	return response.data;
});
export const createMyPuppy = createAsyncThunk("mypuppy/createMyPuppy", async (dogInfo) => {
	const response = await apiClient.post(`/profile/mypuppy/create`, dogInfo);
	return response.data;
});
export const editMyPuppy = createAsyncThunk("mypuppy/editMyPuppy", async (dogInfo) => {
	const response = await apiClient.put(`/profile/mypuppy/edit`, dogInfo);
	return response.data;
});

export const fetchMyPage = createAsyncThunk("mypuppy/fetchMyPage", async () => {
	const response = await apiClient(`/profile/mypage`);
	return response.data;
});

const myPuppySlice = createSlice({
	name: "mypuppy",
	initialState,
	reducer: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMyPuppy.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchMyPuppy.fulfilled, (state, action) => {
				state.dogName = action.payload.dogName;
				state.size = action.payload.size;
				state.etc = action.payload.etc;
				state.isLoading = false;
				console.log("fetchMyPuppy fulfilled: ", state.dogName);
				console.log("fetchMyPuppy fulfilled: ", action.payload);
			})
			.addCase(fetchMyPuppy.rejected, (state) => {
				console.log("fetchMyPuppy rejected");
				state.isLoading = false;
			})
			.addCase(createMyPuppy.fulfilled, (state, action) => {
				state.dogName = action.payload.dogName;
				state.size = action.payload.size;
				state.etc = action.payload.etc;
			})
			.addCase(createMyPuppy.rejected, (action) => {
				console.log("createMyPuppy rejected");
			})
			.addCase(editMyPuppy.fulfilled, (state, action) => {
				state.dogName = action.payload.dogName;
				state.size = action.payload.size;
				state.etc = action.payload.etc;
			})
			.addCase(editMyPuppy.rejected, (state, action) => {
				console.log("editMyPuppy rejected");
			});
	},
});

export default myPuppySlice.reducer;

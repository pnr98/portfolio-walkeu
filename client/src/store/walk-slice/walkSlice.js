import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/apiService";

const initialState = {
	walks: [], // 한달의 산책날짜 리스트
	isLoading: false,
	error: null,
};
// 캘린더에 산책 기록 불러오기
export const fetchWalkRecord = createAsyncThunk("walk/fetchWalkRecord", async (date) => {
	const response = await apiClient.get(`/walks?date=${date}`);
	return response.data; // dataList
});

// 산책 기록 추가하기
export const addWalk = createAsyncThunk("walk/addWalk", async (walkDate) => {
	const response = await apiClient.post(`/walks/add`, { date: walkDate });
	return response.data;
});

export const deleteWalk = createAsyncThunk("walk/deleteWalk", async (walkDate) => {
	const response = await apiClient.delete(`/walks/delete/${walkDate}`);
	return response.data;
});

const walkSlice = createSlice({
	name: "walk",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchWalkRecord.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchWalkRecord.fulfilled, (state, action) => {
			state.isLoading = false;
			state.walks = action.payload.dateList;
		});
		builder.addCase(fetchWalkRecord.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		});
		builder.addCase(addWalk.fulfilled, (state, action) => {
			state.walks.push(action.payload);
		});
		builder.addCase(addWalk.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		});
		builder.addCase(deleteWalk.fulfilled, (state, action) => {
			// 기존 fetchWalks, addWalk는 그대로 유지
			state.walks = state.walks.filter((walk) => walk.date !== action.payload);
		});
		builder.addCase(deleteWalk.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		});
	},
});

export default walkSlice.reducer;

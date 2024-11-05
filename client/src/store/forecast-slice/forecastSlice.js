import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/apiService";

const initialState = {
	nowWeather: {
		precipitationForm: [], //PTY 강수형태 12
		precipitation: [], //RN1 강수량 18
		temperature: [], //T1H 기온 30
		humidity: [], //REH 습도 36
		windSpeed: [], //WSD 풍속 54-60
		airQuality: {
			khaiValue: null,
			khaiGrade: null,
		},
	},
	shortTerm: {
		// 초단기 (6시간)
		precipitationForm: [], //PTY 강수형태 12
		precipitation: [], //RN1 강수량 18
		skyState: [], //SKY 하늘상태 24
		temperature: [], //T1H 기온 30
		humidity: [], //REH 습도 36
		windSpeed: [], //WSD 풍속 54-60
	},
	longTerm: {
		prcpProbability: [],
		thermoMinimum: [],
		thermoMaximum: [],
	},
	errors: [],
};
// 초단기실황
export const fetchNowWeather = createAsyncThunk("forecast/fetchNowWeather", async ({ lat, lng, address }) => {
	const response = await apiClient.get(`/forecast/now?lat=${lat}&lng=${lng}&addr=${address}`);
	return response.data;
});
// 초단기예보
export const fetchShortWeather = createAsyncThunk("forecast/fetchShortWeather", async ({ lat, lng }) => {
	const response = await apiClient.get(`/forecast/short?lat=${lat}&lng=${lng}`);
	return response.data;
});
// 단기예보
export const fetchLongWeather = createAsyncThunk("forecast/fetchLongWeather", async ({ lat, lng }) => {
	const response = await apiClient.get(`/forecast/long?lat=${lat}&lng=${lng}`);
	return response.data;
});

const forecastSlice = createSlice({
	name: "forecast",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchNowWeather.fulfilled, (state, action) => {
			state.nowWeather = action.payload;
		});
		builder.addCase(fetchNowWeather.rejected, (state, action) => {
			state.errors.push(action.error.message);
		});
		builder.addCase(fetchShortWeather.fulfilled, (state, action) => {
			state.shortTerm = action.payload;
		});
		builder.addCase(fetchShortWeather.rejected, (state, action) => {
			state.errors.push(action.error.message);
		});
		builder.addCase(fetchLongWeather.fulfilled, (state, action) => {
			state.longTerm = action.payload;
		});
		builder.addCase(fetchLongWeather.rejected, (state, action) => {
			state.errors.push(action.error.message);
		});
	},
});

export default forecastSlice.reducer;

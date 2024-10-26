import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/apiService";

const initialState = {
	nowWeather: {
		precipitationForm: [], //PTY 강수형태 12
		precipitation: [], //RN1 강수량 18
		temperature: [], //T1H 기온 30
		humidity: [], //REH 습도 36
		windSpeed: [], //WSD 풍속 54-60
	},

	shortTerm: {
		// 초단기 (6시간)
		lightningStrike: [], // LGT 낙뢰 6
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
	}, // 단기(7일)
	airQuality: {
		khaiValue: null,
		khaiGrade: null,
	},
	error: [],
};
// 초단기예보, 실황, 대기질
export const fetchWeather = createAsyncThunk("forecast/fetchWeather", async ({ lat, lng, address }) => {
	const response = await apiClient.get(`/forecast?lat=${lat}&lng=${lng}&addr=${address}`);
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
		builder.addCase(fetchWeather.fulfilled, (state, action) => {
			state.nowWeather = action.payload.nowWeather;
			state.shortTerm = action.payload.shortTerm;
			state.airQuality = action.payload.airQuality;
		});
		builder.addCase(fetchWeather.rejected, (state, action) => {
			state.error.push(action.error.message);
		});
		builder.addCase(fetchLongWeather.fulfilled, (state, action) => {
			state.longTerm = action.payload.longTerm;
		});
		builder.addCase(fetchLongWeather.rejected, (state, action) => {
			state.error.push(action.error.message);
		});
	},
});

export default forecastSlice.reducer;

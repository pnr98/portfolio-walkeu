import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import walkReducer from "./walk-slice/walkSlice";
import regionReducer from "./region-slice/regionSlice";
import forecastReducer from "./forecast-slice/forecastSlice";
import { forecastApi } from "./forecast-slice/forecastApi";
import mypuppyReducer from "./profile-slice/mypuppySlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		walk: walkReducer,
		region: regionReducer,
		mypuppy: mypuppyReducer,
		// forecast: forecastReducer,
		[forecastApi.reducerPath]: forecastApi.reducer,
	},
	// 캐싱, 요청 취소, 폴링 등등 유용한 rtk-query의 기능들을 위한 api 미들웨어 추가
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(forecastApi.middleware),
});

export default store;

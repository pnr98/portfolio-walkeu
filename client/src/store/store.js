import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import walkReducer from "./walk-slice/walkSlice";
import regionReducer from "./region-slice/regionSlice";
import forecastReducer from "./forecast-slice/forecastSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		walk: walkReducer,
		region: regionReducer,
		forecast: forecastReducer,
	},
});

export default store;

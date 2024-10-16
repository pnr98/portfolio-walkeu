import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import walkReducer from "./walk-slice/walkSlice";
const store = configureStore({
	reducer: {
		auth: authReducer,
		walk: walkReducer,
	},
});

export default store;

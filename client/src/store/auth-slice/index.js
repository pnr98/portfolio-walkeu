import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	isAuthenticated: false,
	isLoading: false,
	user: null,
	isLoggedIn: false,
	token: null,
};
//rejectWithValue : 서버에서 보낸 에러 메시지를 반환
// 비동기 처리할 때 사용. 액션
export const registerUser = createAsyncThunk(
	// 액션 이름. auth 네임스페이스 아래의 register 액션.
	// 여러 개의 액션이 있을 때, 어떤 액션이 어떤 기능과 관련되어 있는지를 쉽게 알 수 있습
	"/auth/register",
	// 처리할 비동기 함수
	async (formData) => {
		const response = await axios.post("http://localhost:5000/auth/register", formData, {
			withCredentials: true,
		});
		return response.data;
	}
);
export const loginUser = createAsyncThunk("/auth/login", async (formData, { rejectWithValue }) => {
	try {
		const response = await axios.post("http://localhost:5000/auth/login", formData, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
export const logoutUser = createAsyncThunk("/auth/logout", async () => {
	const response = await axios.post(
		"http://localhost:5000/auth/logout",
		{
			withCredentials: true,
		}
	);
	return response.data;
});
export const checkAuth = createAsyncThunk("/auth/checkAuth", async () => {
	const response = await axios.get("http://localhost:5000/auth/checkAuth", {
		withCredentials: true,
	});
	return response.data;
});

// api호출과같은 비동기 로직을 간단하고 효율적으로 관리할 수 있게 도움
// 비동기 작업의 상태를 자동으로 처리하고 관련 액션 생성
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		login(state, action) {
			state.user = action.payload.user;
			state.token = action.payload.token;
			localStorage.setItem("token", action.payload.token);
		},
		logout(state) {
			state.user = null;
			state.token = null;
			localStorage.removeItem("token");
		},
		loadUser(state) {
			const token = localStorage.getItem("token");
			if (token) {
				state.token = token;

				// 필요한 경우 추가 사용자 정보를 저장하는 로직 추가
			}
		},
	},
	// action의 peding, fulfilled, rejected 상태에 대한 처리 결과를 넣을 수 있음
	extraReducers: (builder) => {
		builder
			// 회원가입
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = true;
			})
			// 로그인
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isLoggedIn = true;
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.isAuthenticated = true;
			})
			.addCase(loginUser.rejected, (state) => {
				state.isLoading = true;
			})
			// 로그아웃
			.addCase(logoutUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(logoutUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = null;
				state.token = null;
				state.isAuthenticated = false;
				state.isLoggedIn = false;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.isLoading = true;
			});
	},
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

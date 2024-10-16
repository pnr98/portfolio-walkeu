import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/apiService";

const initialState = {
	isAuthenticated: false,
	isLoading: false,
	user: {
		nickname: null,
		email: null,
		role: null,
	},
	isLoggedIn: false,
};
//rejectWithValue : 서버에서 보낸 에러 메시지를 반환
// 비동기 처리할 때 사용. 액션
export const registerUser = createAsyncThunk(
	// 액션 이름. auth 네임스페이스 아래의 register 액션.
	// 여러 개의 액션이 있을 때, 어떤 액션이 어떤 기능과 관련되어 있는지를 쉽게 알 수 있습
	"/auth/register",
	// 처리할 비동기 함수
	async (formData) => {
		const response = await apiClient.post("/auth/register", formData, {});
		return response.data;
	}
);
export const loginUser = createAsyncThunk("/auth/login", async (formData, { rejectWithValue }) => {
	try {
		const response = await apiClient.post("/auth/login", formData, {});
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
export const logoutUser = createAsyncThunk("/auth/logout", async (_, { rejectWithValue }) => {
	try {
		const response = await apiClient.post("/auth/logout", null, {});
		localStorage.removeItem("accessToken");
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
// 앱이 처음 로드될 때 사용자의 로그인 상태 확인
// API 요청 전에 토큰을 확인하고, 리프레시 토큰이 만료되면 로그인 페이지로 이동.
export const checkAuth = createAsyncThunk("/auth/checkAuth", async (_, { rejectWithValue }) => {
	try {
		const response = await apiClient.get("/auth/check-auth");
		return response.data; // user 정보
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

// api호출과같은 비동기 로직을 간단하고 효율적으로 관리할 수 있게 도움
// 비동기 작업의 상태를 자동으로 처리하고 관련 액션 생성
const authSlice = createSlice({
	name: "auth",
	initialState,
	// 비동기 작업이 필요하지 않을 때, 즉 상태를 직접 변경하고 싶을 때 호출
	reducers: {
		logout: (state) => {
			state.isAuthenticated = false;
			state.isLoading = false;
			state.user = null;
			state.isLoggedIn = false;
			state.token = null;
		},
		setUser: (state, action) => {},
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
				state.isLoading = false;
			})
			// 로그인
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isLoggedIn = true;
				state.user = action.payload.user;
				state.isAuthenticated = true;
			})
			.addCase(loginUser.rejected, (state) => {
				state.isLoading = false;
			})
			// 로그아웃
			.addCase(logoutUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
				state.isLoggedIn = false;
			})
			.addCase(logoutUser.rejected, (state) => {
				state.isLoading = false;
			})
			// 사용자 인증 검증
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.isLoggedIn = true;
				state.user = action.payload.user;
			})
			.addCase(checkAuth.rejected, (state) => {
				state.isAuthenticated = false;
				state.isLoggedIn = false;
				state.user = null;
			});
	},
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

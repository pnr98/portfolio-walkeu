import axios from "axios";
import { handleLogout } from "../utils/handleLogout";

// 기본 axios 인스턴스 생성
const apiClient = axios.create({
	baseURL: "http://localhost:5000",
	withCredentials: true,
});

// 요청 인터셉터. 모든 요청을 보내기전에 accessToken을 붙임.
const unauthenticatedRoutes = ["/login", "/register", "/public"];

apiClient.interceptors.request.use(
	(config) => {
		// 인증이 필요한 엔드포인트에만 토큰을 붙이도록 조건 설정
		// API가 사용자 인증을 요구할 때 (예: 사용자 프로필, 주문 정보, 비공개 게시물 등)
		// 보호된 리소스에 접근할 때 (예: 개인 설정, 데이터베이스 변경 등)
		// 관리자 권한이 필요할 때 (예: 관리자 페이지, 시스템 설정 등)
		// 인증이 필요 없는 요청(ex: 로그인 페이지, 공개 게시물)은 토큰이 없어도 됩니다.
		const requiresAuth = !unauthenticatedRoutes.some((route) => config.url.includes(route));
		if (requiresAuth) {
			const accessToken = localStorage.getItem("accessToken");
			if (accessToken) {
				config.headers["Authorization"] = `Bearer ${accessToken}`;
			}
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// 응답 인터셉터. 서버로부터 응답을 받은 후 실행. 응답 상태가 401일경우 새로운 액세스 토큰을 받아옴.
apiClient.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		// 리프레시 토큰 없을 때 + 액세스 토큰 유무는 상관없음 --> 무조건 로그아웃
		if (error.response.status === 403 && !originalRequest._retry) {
			console.error("리프레시 토큰이 만료되었습니다.", error);
			handleLogout();
			return Promise.reject(error);
		}
		// 401 에러 = 액세스 토큰 없음 --> 재발급 요청
		if (error.response.status === 401 && !originalRequest._retry) {
			//_retry: 해당 요청이 이미 재시도 되었는지 확인. 처음 오류가 발생했을 때 undefined 또는 false.
			// 응답 인터셉터 내에서 자동 토큰 갱신 로직을 처리할 때, 무한 재시도 루프에 빠지는 것을 방지
			originalRequest._retry = true;
			console.log("에러핸들러");
			try {
				// 새로운 액세스 토큰 요청 요청
				const response = await apiClient.post("/auth/refresh-token");
				const { accessToken } = response.data;
				localStorage.setItem("accessToken", accessToken);
				// 실패했던 요청을 새로운 accessToken으로 재시도
				console.log("클라: 재발급시도");
				originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
				return apiClient(originalRequest);
			} catch (error) {
				//  403 에러 = 리프레시 토큰은 없지만 액세스 토큰은 있을때
				if (error.response.status === 403) {
					console.error("리프레시 토큰이 만료되었습니다.", error);
					handleLogout();
					return Promise.reject(error);
				}
			}
		}
		return Promise.reject(error);
	}
);

export default apiClient;

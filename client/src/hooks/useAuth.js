import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth, logout } from "../store/auth-slice";
import apiClient from "../api/apiService";

// 앱 시작시 인증상태 확인
// 액세스 토큰을 감시해 없을 경우
const useAuth = () => {
	const dispatch = useDispatch();

	const checkAuthState = async () => {
		const accessToken = localStorage.getItem("accessToken");
		if (accessToken) {
			dispatch(checkAuth());
		} else {
			try {
				const response = await apiClient.post("/auth/refresh-token");
				const { accessToken } = response.data; // 서버에서 새로운 액세스 토큰을 받아옴
				localStorage.setItem("accessToken", accessToken); // 액세스 토큰을 로컬 스토리지에 저장
				dispatch(checkAuth());
			} catch (error) {
				console.error("액세스 토큰 재발급 중 오류 발생:", error);
				dispatch(logout());
			}
		}
	};
	useEffect(() => {
		// checkAuthState();
	}, [dispatch]);
};

export default useAuth;

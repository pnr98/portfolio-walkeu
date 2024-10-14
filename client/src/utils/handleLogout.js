export const handleLogout = () => {
	localStorage.removeItem("accessToken");
	// /login 페이지로 리다이렉트. 현재 상태를 유지하지 않고 새로고침됨.
	// window.location.href = "/login";
};

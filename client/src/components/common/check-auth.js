import { Navigate, useLocation } from "react-router-dom";

// 로그인 페이지가 안들어가짐 . 다시 설정하기.
const CheckAuth = ({ isAuthenticated, user, children }) => {
	const location = useLocation();
	const path = location.pathname;

	// 로그인이 안된 사용자가 마이페이지 또는 퍼피로 접근하면 --> 로그인 // 게시글 작성, 수정 페이지??
	if (!isAuthenticated) {
		if (path.includes("/mypage") || path.includes("/mypuppy") || path.includes("/calender")) {
			return <Navigate to="/login" />;
		}
	}
	// 로그인 되어있는데, 로그인 또는 회원가입 페이지로 접근하는 경우 --> 홈
	if (isAuthenticated && (path.includes("/login") || path.includes("/register"))) {
		return <Navigate to="/" />;
	}
	// 관리자가 아닌 사용자가 게시판 관리자 페이지로 접근하는 경우 --> 홈
	if (isAuthenticated && user?.role !== "admin" && path.includes("/admin/board")) {
		return <Navigate to="/" />;
	}
	return <>{children}</>;
};

export default CheckAuth;
// 로그인안된 사용자가

// 로그인 사용자가 로그인, 회원가입 페이지를 들어갈 수 없음.
// 관리자 페이지도 들어갈 수 없음

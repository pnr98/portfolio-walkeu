import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// 로그인 상태에서 로그인 들어갈시 정상적으로 들어가짐--> 오류수정

const ProtectedRoute = () => {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const user = useSelector((state) => state.auth.user);
	const location = useLocation();
	const path = location.pathname;

	// 로그인이 안된 사용자가 마이페이지 또는 퍼피로 접근하면 --> 로그인 // 게시글 작성, 수정 페이지??
	if (!isLoggedIn) {
		if (path === "/mypage" || path === "/mypuppy" || path === "/calender") {
			return <Navigate to="/login" />;
		}
	} else if (isLoggedIn) {
		// 로그인 되어있는데, 로그인 또는 회원가입 페이지로 접근하는 경우 --> 홈
		if (path === "/login" || path === "/register") {
			return <Navigate to="/forecast" />;
		}
		// 관리자가 아닌 사용자가 게시판 관리자 페이지로 접근하는 경우 --> 홈
		if (user?.role === 0 && path.includes("/admin/board")) {
			return <Navigate to="/" />;
		}
	}
	return <Outlet />;
};

export default ProtectedRoute;

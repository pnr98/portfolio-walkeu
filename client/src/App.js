import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import MyCalender from "./pages/MyCalender";
import Login from "./pages/auth/Login";
import MyPage from "./pages/user/MyPage";
import MyPuppy from "./pages/user/MyPuppy";
import Register from "./pages/auth/Register";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import ForecastPage from "./pages/ForecastPage";
import getLocation from "./utils/getLocation";

function App() {
	const dispatch = useDispatch();
	// 액세스 토큰이 없고, 쿠키도 없으면 굳이 요청을 보낼필요 없음?
	useEffect(() => {
		getLocation(dispatch);
		// dispatch(getLocation());
		dispatch(checkAuth());
	}, [dispatch]); // 원래 빈배열

	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/forecast" element={<ForecastPage />} />

				<Route element={<ProtectedRoute />}>
					<Route path="/calendar" element={<MyCalender />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="/mypage" element={<MyPage />} />
					<Route path="/mypuppy" element={<MyPuppy />} />
				</Route>
			</Routes>
		</Layout>
	);
}

export default App;

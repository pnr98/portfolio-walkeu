import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Walk from "./pages/Walk";
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

function App() {
	const dispatch = useDispatch();
	// 액세스 토큰이 없고, 쿠키도 없으면 굳이 요청을 보낼필요 없음?
	useEffect(() => {
		dispatch(checkAuth());
	}, []);

	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/walk" element={<Walk />} />

				<Route element={<ProtectedRoute />}>
					<Route path="/calender" element={<MyCalender />} />
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

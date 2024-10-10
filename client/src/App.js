import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Walk from "./pages/Walk";
import Calender from "./pages/Calender";
import Login from "./pages/auth/Login";
import MyPage from "./pages/user/MyPage";
import MyPuppy from "./pages/user/MyPuppy";
import Register from "./pages/auth/Register";
import Layout from "./components/layout/Layout";
import CheckAuth from "./components/common/check-auth";

function App() {
	const isAuthenticated = false;
	const user = null;

	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Main />} />
				{/* <Route
					path="/auth"
					element={
						// <CheckAuth isAuthenticated={isAuthenticated} user={user}>
						<AuthLayout />
						// </CheckAuth>
					}
				> */}
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				{/* </Route> */}
				<Route element={<CheckAuth isAuthenticated={isAuthenticated} user={user} />}>
					<Route path="/mypage" element={<MyPage />} />
					<Route path="/mypuppy" element={<MyPuppy />} />
					<Route path="/calender" element={<Calender />} />
				</Route>
				<Route path="/walk" element={<Walk />} />
			</Routes>
		</Layout>
	);
}

export default App;

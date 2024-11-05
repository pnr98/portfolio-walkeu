import { useLocation } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import styled, { css } from "styled-components";

const AppContainer = styled.div`
	width: 100%;
	height: 100vh;
	padding: 15px;
	display: flex;
	gap: 15px;
	background-color: #f2f2f2;
	justify-content: center;
	position: relative; // nav z-index 설정을 위해
`;
const MainContainer = styled.div`
	/* flex: 1; */
	display: flex;
	background-color: var(--white);
	border-radius: 40px;
	width: 900px;
	height: 100%; // height: calc(100vh - 30px);
	justify-content: center;
	align-items: center;
	box-shadow: 10px 10px 20px var(--shadow-10);

	/* 그라데이션 */
	position: relative;
	padding: 0px 50px;

	${(props) =>
		props.withGradient &&
		css`
			&::before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				border-radius: 40px 40px 0px 0px;
				width: 100%;
				height: 100px; /* 그라데이션 높이 */
				background: linear-gradient(
					to bottom,
					rgba(255, 255, 255, 1),
					rgba(255, 255, 255, 0.7),
					rgba(255, 255, 255, 0)
				);
				z-index: 1;
			}
			&::after {
				content: "";
				position: absolute;
				bottom: 0;
				left: 0;
				border-radius: 0px 0px 40px 40px;
				width: 100%;
				height: 80px; /* 그라데이션 높이 */
				background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
				z-index: 1;
			}
		`}
`;
const MainWrraper = styled.div`
	/* background-color: var(--grey-20); */
	display: flex;
	align-items: start;
	justify-content: center;
	width: 100%;
	height: 100%;
	overflow-y: auto;

	padding: 100px 0px 50px 0px; /* padding으로 상하 그라데이션과 간격 확보 */

	// 스크롤
	::-webkit-scrollbar {
		/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
		display: none;
	}
	-ms-overflow-style: none; /* 인터넷 익스플로러 */
	scrollbar-width: none; /* 파이어폭스 */
`;

const Layout = ({ children }) => {
	const location = useLocation();
	const isCalendarPage = location.pathname === "/forecast";

	return (
		<AppContainer>
			<Nav />
			<MainContainer withGradient={isCalendarPage}>
				<MainWrraper>{children}</MainWrraper>
			</MainContainer>
			<Header />
		</AppContainer>
	);
};

export default Layout;

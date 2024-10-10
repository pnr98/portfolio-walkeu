import Header from "./Header";
import Nav from "./Nav";
import styled from "styled-components";

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
	justify-content: center;
	align-items: center;
	box-shadow: 10px 10px 20px var(--shadow-10);
`;
const MainWrraper = styled.div`
`;

const Layout = ({ children }) => {
	return (
		<AppContainer>
			<Nav />
			<MainContainer>
				<MainWrraper>{children}</MainWrraper>
			</MainContainer>
			<Header />
		</AppContainer>
	);
};

export default Layout;

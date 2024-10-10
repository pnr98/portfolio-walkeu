import styled from "styled-components";
// 반응형 시 --> padding 줄어들기 --> 왼쪽, 오른쪽을 세로로 배치
const Container = styled.div`
	display: flex;
	/* -webkit-box-shadow: 0px 10px 34px -15px rgba(0, 0, 0, 0.24);
	-moz-box-shadow: 0px 10px 34px -15px rgba(0, 0, 0, 0.24); */
	box-shadow: 0px 10px 34px -15px rgba(0, 0, 0, 0.24);
	width: 100%;
`;

const LeftSection = styled.div`
	border-radius: 20px 0px 0px 20px;
	padding: 50px;
	width: 350px;
	h1 {
		font-size: 24px;
		margin-bottom: 20px;
	}
`;
const RightSection = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 15px;
	width: 280px;
	border-radius: 0 20px 20px 0;
	color: var(--white);
	background: linear-gradient(
		to right,
		#f2a99c,
		#ff416c
	); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	h1 {
		font-size: 24px;
		font-weight: 900;
		font-family: "Lato";
		margin-bottom: 20px;
	}
`;

const AuthLayout = ({ title, children1, children2 }) => {
	return (
		<Container>
			<LeftSection>
				<>
					<h1>{title}</h1>
					{children1}
				</>
			</LeftSection>
			<RightSection>{children2}</RightSection>
		</Container>
	);
};

export default AuthLayout;

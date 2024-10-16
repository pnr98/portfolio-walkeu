import styled from "styled-components";
import Calender from "../components/ui/Calender";

const Container = styled.div`
	display: flex;
	justify-content: center;
`;

const MyCalender = () => {
	return (
		<Container>
			<Calender />
		</Container>
	);
};

export default MyCalender;

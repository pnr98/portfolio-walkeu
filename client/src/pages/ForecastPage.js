import { useSelector } from "react-redux";
import Button from "../components/ui/Button";
import { useState } from "react";
import Search from "../components/ui/Search";
import Forecast from "../components/ui/Forecast";
import styled from "styled-components";

const RegionName = styled.div`
	margin: 20px 0px;
	font-size: 24px;
`;
const ForecastPage = () => {
	const regionName = useSelector((state) => state.region.address);

	const [modalContent, setModalContent] = useState("");

	const [modalOpen, setModalOpen] = useState(false);
	const openModal = () => {
		setModalOpen(true);
	};
	const closeModal = () => {
		setModalOpen(false);
	};

	const handleClick = () => {
		openModal();
	};

	return (
		<div>
			<Search isOpen={modalOpen} onClose={closeModal} modalContent={modalContent} />
			<RegionName>{regionName ? regionName : "위치 정보를 불러오는 중..."}</RegionName>
			<Forecast />
			<Button onClick={handleClick}>눌러</Button>
		</div>
	);
};

export default ForecastPage;

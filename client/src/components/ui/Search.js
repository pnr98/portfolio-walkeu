import { useState, useEffect } from "react";
import { styled } from "styled-components";
import Input from "../ui/Input";

const SearchContainer = styled.div`
	background-color: rgba(0, 0, 0, 0.2);
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 100;
`;

const SearchWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	border-radius: 20px;
	padding: 30px;
	background-color: var(--white);
	width: 100%;
	z-index: 101;
	white-space: nowrap;
	font-size: 20px;
	.btn-container {
		display: flex;
		gap: 10px;
	}
`;
// 사용자 위치에 따른 지역 이름을 보여줌
const Search = ({ isOpen, onClose, modalContent, handleClick }) => {
	const [modalVisible, setModalvisible] = useState(isOpen);
	// 모달 닫기
	const closeModal = () => {
		setModalvisible(false);
		onClose();
	};
	// 모달의 오픈상태가 바뀌면 보이는 유무.
	useEffect(() => {
		setModalvisible(isOpen);
	}, [isOpen]);

	const [inputValue, setInputValue] = useState("");
	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputValue({
			...inputValue,
			[name]: value,
		});
	};

	return (
		<>
			{modalVisible && (
				// 모달 바깥을 클릭하면 닫힘
				<SearchContainer onClick={closeModal}>
					<div onClick={(e) => e.stopPropagation()}>
						<SearchWrapper>
							<Input
								type="text"
								name="search"
								id="search"
								value={inputValue.name}
								onChange={handleChange}
								placeholder="동네명을 입력해주세요"
							/>

							<div className="btn-container"></div>
						</SearchWrapper>
					</div>
				</SearchContainer>
			)}
		</>
	);
};

export default Search;

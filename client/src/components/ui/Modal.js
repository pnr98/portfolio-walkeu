import { useEffect, useState } from "react";
import Button from "./Button";
import styled from "styled-components";

const ModalContainer = styled.div`
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

const ModalWrapper = styled.div`
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

	.btn-container {
		display: flex;
		gap: 10px;
	}
`;
const Modal = ({ isOpen, onClose, modalContent, handleClick }) => {
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

	return (
		<>
			{modalVisible && (
				// 모달 바깥을 클릭하면 닫힘
				<ModalContainer onClick={closeModal}>
					<div onClick={(e) => e.stopPropagation()}>
						<ModalWrapper>
							<div>{modalContent}</div>
							<div className="btn-container">
								<Button onClick={closeModal} size="sm" variant="cancleBtn">
									취소
								</Button>
								<Button onClick={handleClick} size="sm" variant="confirmBtn">
									확인
								</Button>
							</div>
						</ModalWrapper>
					</div>
				</ModalContainer>
			)}
		</>
	);
};

export default Modal;

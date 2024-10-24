import styled from "styled-components";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import Button from "../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/auth-slice";
import { useState } from "react";
import Modal from "../ui/Modal";

const HeaderContainer = styled.div`
	background-color: var(--white);
	border-radius: 40px;
	height: 100%;
	width: 80px;
	box-shadow: 10px 10px 20px var(--shadow-10);

	display: flex;
	justify-content: center;
`;

const IconContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin: 30px 0px;
	svg {
		color: var(--black-20);
		font-size: 30px;
	}
`;

const Header = () => {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogout = async () => {
		// 로그아웃 하시겠습니까 모달 넣기
		try {
			const response = await dispatch(logoutUser());
			if (logoutUser.fulfilled.match(response)) {
				console.log("로그아웃 성공:", response.payload.message);
				navigate("/login");
			} else {
				console.log("로그아웃 실패:", response.payload.message);
			}
			setModalOpen(false);
		} catch (error) {
			console.error("로그아웃 중 오류 발생:", error);
		}
	};
	const [modalOpen, setModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState("");

	const openModal = () => {
		setModalOpen(true);
		if (isLoggedIn) {
			setModalContent("로그아웃 하시겠습니까?");
		}
	};
	const closeModal = () => {
		setModalOpen(false);
	};
	return (
		<HeaderContainer>
			<Modal isOpen={modalOpen} onClose={closeModal} modalContent={modalContent} handleClick={handleLogout} />
			{isLoggedIn ? (
				<IconContainer>
					<Button>
						<RxHamburgerMenu className="icon-hamburger" />
					</Button>
					<Button onClick={openModal}>
						<FiLogOut className="icon-logout" />
					</Button>
				</IconContainer>
			) : (
				<IconContainer>
					<Link to="login">
						<Button>
							<FiLogIn className="icon-login" />
						</Button>
					</Link>
				</IconContainer>
			)}
		</HeaderContainer>
	);
};

export default Header;

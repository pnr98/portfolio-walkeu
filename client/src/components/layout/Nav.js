import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import React from "react";

const Container = styled.div`
	position: absolute;
	z-index: 50;
	margin-top: 30px;
	border: 1.5px solid var(--border);
	/* box-shadow: 0 0 0 2px var(--border) inset; */
	border-radius: 15px;
	background-color: var(--white);
	width: 500px;
	> div {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;
const Icon = styled.img`
	width: 14px;
	height: 14px;
`;

const navItems = [
	{ name: "홈!!", path: "/" },
	{ name: "산책해요", path: "/forecast" },
	{ name: "산책했어요", path: "/calendar" },
	{ name: "게시판", path: "/board" },
];

const Nav = () => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<Container>
			<div>
				{navItems.map((item, index) => (
					<React.Fragment key={index}>
						<Button
							size="md"
							variant="navBtn"
							onClick={() => navigate(item.path)}
							isActive={location.pathname === item.path}
						>
							{item.name}
						</Button>
						{index < navItems.length - 1 && <Icon src={require("../../assets/nav.png")} alt="" />}
					</React.Fragment>
				))}
			</div>
		</Container>
	);
};

export default Nav;

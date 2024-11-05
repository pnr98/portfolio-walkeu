import { useEffect, useState } from "react";
import styled from "styled-components";
import MyPage from "./MyPage";
import MyPuppy from "./MyPuppy";
import { Link, useLocation } from "react-router-dom";

const TabContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: start;
	width: 100%;

	.tabs {
		display: flex;
		flex-direction: column;
	}
	.tab-content {
		width: 500px;
		height: 100%;
		padding: 10px 30px;
	}
`;

const StyledButton = styled.div`
	text-align: center;
	width: 100%;
	font-size: 18px;
	padding: 15px 25px;
	border-radius: 20px;
	background-color: ${({ isActive }) => (isActive ? "var(--black-30)" : "transparent")};
	color: ${({ isActive }) => (isActive ? "var(--blue-10)" : "inherit")};
	cursor: pointer;
`;

const navItems = [
	{ name: "마이퍼피", path: "/profile/mypuppy" },
	{ name: "마이페이지", path: "/profile/mypage" },
];

const ProfileTabs = () => {
	const location = useLocation();
	const currentPath = location.pathname.split("/")[2];
	const [activeTab, setActiveTab] = useState(currentPath || "mypuppy");

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	useEffect(() => {
		setActiveTab(currentPath || "mypuppy");
	}, [location]);

	return (
		<TabContainer>
			<div className="tabs">
				{navItems.map((item) => (
					<Link key={item.path} to={item.path}>
						<StyledButton
							isActive={activeTab === item.path.split("/")[2]}
							onClick={() => handleTabClick(item.path.split("/")[2])}
						>
							{item.name}
						</StyledButton>
					</Link>
				))}
			</div>
			<div className="tab-content">
				{activeTab === "mypuppy" && <MyPuppy />}
				{activeTab === "mypage" && <MyPage />}
			</div>
		</TabContainer>
	);
};

export default ProfileTabs;

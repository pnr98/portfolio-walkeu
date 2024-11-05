import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

const MyPuppy = () => {
	// 1. 로그인 시 강아지 정보를 요청해서 store에 저장.
	// 2. 강아지 정보가 없으면? 날씨 페이지에서 작성하라고 마이퍼피페이지로 연결해줌. "/create"
	// 3. 강아지 정보가 있으면, 마이퍼피 페이지에서 정보를 보여줌.
	// 4. 강아지 정보 수정 버튼 클릭 시 작성페이지로 이동 "/edit"

	// 사용자가 로그인 시or앱을 처음 로딩할 때에 강아지 정보를 가져와 전역 상태에 저장
	// 강아지 정보가 필요한 페이지 진입시 전역 상태에 강아지 정보가 없다면 요청을 보냄.
	// 만약 강아지 정보의 변경 가능성이 높다면, 페이지 진입 시 강아지 정보의
	// 존재 여부를 확인하고 없을 경우에만 요청하는 방법
	const navigate = useNavigate();
	const { dogName, size, etc } = useSelector((state) => state.mypuppy);

	useEffect(() => {
		if (!dogName) {
			// 강아지 정보가 없으면, 바로 작성페이지로
			navigate("/profile/mypuppy/create");
		} else {
			// 잇으면 조회 페이지
			navigate("/profile/mypuppy/view");
		}
	}, [dogName]); // dogName 또는 navigate가 변경될 때마다 실행

	return (
		<>
			{/* {dogName ? (
				<div>
					<div> 강아지 정보 보여주기 {dogName}</div>
					<Link to="/profile/mypuppy/edit">
						<Button size="md">수정하기</Button>
					</Link>
					<Outlet />
				</div>
			) : (
				<Outlet />
			)} */}

			{dogName ? <Outlet /> : <Outlet />}
		</>
	);
};

export default MyPuppy;

// 기타 -> 북방견 -1 | 단두종 +1 | 6개월미만 or 노령견 +1

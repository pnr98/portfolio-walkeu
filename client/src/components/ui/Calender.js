import {
	endOfMonth,
	startOfMonth,
	startOfWeek,
	endOfWeek,
	addMonths,
	differenceInCalendarDays,
	addDays,
	format,
	subMonths,
} from "date-fns";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { addWalk, deleteWalk, fetchWalkRecord } from "../../store/walk-slice/walkSlice";
import Modal from "./Modal";

const CalenderContainer = styled.div`
	padding: 30px;
	font-size: 20px;
	position: relative;
	margin-top: 20px;
`;
const CalenderHeader = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-bottom: 20px;
`;
const CalenderWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	gap: 25px;
	text-align: center;
	.week {
		font-weight: 600;
	}
	.days {
		display: contents;
	}
`;
const Day = styled.div`
	/* aspect-ratio: 1 / 1; */
	padding: 15px;
	font-size: 20px;
	border-radius: 50%;
	cursor: pointer;
	${(props) =>
		props.isCurrent
			? css`
					background-color: var(--grey-20);
					&:hover {
						background: var(--black-30);
					}
				`
			: css`
					background-color: var(--grey-10);
					color: var(--black-10);
					&:hover {
						background: var(--black-30);
					}
				`}
	&:hover {
		background-color: var(--pink-10);
	}

	&.walked {
		background-color: var(--purple);
	}
`;
const Calender = () => {
	const dispatch = useDispatch();
	const { walks } = useSelector((state) => state.walk);
	const [currentDate, setCurrentDate] = useState(new Date());

	const monthStart = startOfMonth(currentDate); // 달의 시작 날짜
	const monthEnd = endOfMonth(currentDate); // 달의 마지막 날짜
	const startDate = startOfWeek(monthStart); // week의 시작 날짜
	const endDate = endOfWeek(monthEnd); // week 끝나는 날짜
	const weekMock = ["일", "월", "화", "수", "목", "금", "토"];

	// 현재 달의 산책 기록 불러오기
	useEffect(() => {
		dispatch(fetchWalkRecord(format(currentDate, "yyyy-MM")));
	}, [currentDate, dispatch]);

	// 달력 생성/ useMemo로 이미 불러온 값들 저장.
	const createCalender = useMemo(() => {
		const monthArray = [];
		let day = startDate; // 현재 달의 시작일이 속해있는 주의 시작 일을 시작으로
		// 현재 달의 마지막 일이 속해있는 주의 마지막 일까지 하루씩 더하면서 배열에 넣음
		while (differenceInCalendarDays(endDate, day) >= 0) {
			monthArray.push(day); //
			day = addDays(day, 1); // 하루씩 추가
		}
		return monthArray;
	}, [startDate, endDate]);

	// 월 이동 함수 ex) 4월 3일에서 -> 5월 3일
	const nextMonthHandler = useCallback(() => {
		setCurrentDate(addMonths(currentDate, 1));
	}, [currentDate]);
	const prevMonthHandler = useCallback(() => {
		setCurrentDate(subMonths(currentDate, 1));
	}, [currentDate]);

	// 해당날짜에 산책 기록이 있는지
	const isWalked = (day) => {
		return walks?.some((walk) => walk.walkDate === format(day, "yyyy-MM-dd"));
	};

	// 모달 관련
	const [modalContent, setModalContent] = useState("");
	const [clickedDate, setClickDate] = useState(null);

	const handleClick = (day) => {
		const convertedDate = format(day, "yyyy년 M월 d일");
		setClickDate(day);
		// 모달 타입
		if (isWalked(day)) {
			setModalContent(`${convertedDate}의 산책 기록을 삭제하시겠습니까?`);
		} else {
			setModalContent(`${convertedDate}의 산책 기록을 추가하시겠습니까?`);
		}
		openModal();
	};
	const [modalOpen, setModalOpen] = useState(false);
	const openModal = () => {
		setModalOpen(true);
	};
	const closeModal = () => {
		setModalOpen(false);
		setClickDate(null); // 클릭된 날짜 초기화
	};

	// 산책일 추가/삭제
	const handleModalConfirm = async () => {
		try {
			if (!clickedDate) return;
			const convertedDate = format(clickedDate, "yyyy-MM-dd");

			// 산책 기록이 있으면 삭제
			if (isWalked(clickedDate)) {
				await dispatch(deleteWalk(convertedDate));
				// ui 업데이트 즉시 반영?
			} else {
				// 산책 기록이 없으면 추가
				await dispatch(addWalk(convertedDate));
			}
			// 클릭 후 최신 산책 기록 가져오기
			await dispatch(fetchWalkRecord(format(currentDate, "yyyy-MM")));
			closeModal();
		} catch (error) {
			console.log("모달 에러: ", error);
		}
	};

	return (
		<CalenderContainer>
			<Modal isOpen={modalOpen} onClose={closeModal} modalContent={modalContent} handleClick={handleModalConfirm} />
			<CalenderHeader>
				<Button onClick={prevMonthHandler}>
					<IoIosArrowBack />
				</Button>
				<div>{format(currentDate, "yyyy . MM")}</div>
				<Button onClick={nextMonthHandler}>
					<IoIosArrowForward />
				</Button>
			</CalenderHeader>
			<CalenderWrapper>
				{weekMock.map((el, i) => (
					<div key={`day${i}`} className="week">
						{el}
					</div>
				))}
				<div className="days">
					{createCalender.map((el, i) => {
						const isCurrent = el.getMonth() === currentDate.getMonth();
						return (
							<Day
								key={`date${i}`}
								className={isWalked(el) ? "walked" : ""}
								onClick={() => handleClick(el)}
								isCurrent={isCurrent}
							>
								{format(el, "d")}
							</Day>
						);
					})}
				</div>
			</CalenderWrapper>
		</CalenderContainer>
	);
};

export default Calender;

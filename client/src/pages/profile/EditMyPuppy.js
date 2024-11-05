import Input from "../../components/ui/Input";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { createMyPuppy, editMyPuppy } from "../../store/profile-slice/mypuppySlice";
import { Link, useNavigate } from "react-router-dom";

const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
	gap: 20px;
	letter-spacing: 1px;
`;
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid #e0e0e0;
	padding-bottom: 20px;

	h3 {
		font-weight: 600;
		margin-bottom: 20px;
	}
	.options {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
`;

const DogFormController = {
	dogName: {
		type: "text",
		name: "name",
		label: "이름",
		placeholder: "반려견 이름을 입력해주세요",
	},
	size: {
		options: [
			{ label: "소형견(~10kg)", value: "small" },
			{ label: "중형견(~25kg)", value: "medium" },
			{ label: "대형견(25kg~)", value: "large" },
		],
	},
	etc: {
		options: [
			{ label: "추위에 강한 견종 (북방견, 두꺼운 이중모 등)", value: "northern" },
			{ label: "단두종", value: "brachycephalic" },
			{ label: "6개월 미만 혹은 노령견", value: "seniorOrJunior" },
		],
	},
};
//  = "create"
const EditMyPuppy = ({ mode }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const existingDogInfo = useSelector(
		(state) =>
			state.mypuppy || {
				name: "",
				size: "",
				etc: {
					northern: false,
					brachycephalic: false,
					seniorOrJunior: false,
				},
			}
	);

	const [dogInfo, setDogInfo] = useState({
		dogName: "",
		size: "",
		etc: {
			northern: false,
			brachycephalic: false,
			seniorOrJunior: false,
		},
	});

	// 조회, 수정 모드일 때, 기존 데이터를 폼에 불러오기
	useEffect(() => {
		if (mode !== "create" && existingDogInfo) {
			setDogInfo(existingDogInfo);
		}
	}, [mode, existingDogInfo]);

	const handleChange = (e) => {
		if (mode === "view") return;

		const { name, value, type, checked } = e.target;
		setDogInfo((prev) => {
			if (type === "checkbox") {
				return {
					...prev,
					etc: {
						...prev.etc,
						[value]: checked,
					},
				};
			} else if (type === "radio") {
				return {
					...prev,
					[name]: value,
				};
			} else {
				return {
					...prev,
					[name]: value,
				};
			}
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(dogInfo);

		const isValid = (dogInfo) => {
			const isValidName = /^[a-zA-Z가-힣]+$/.test(dogInfo.name);
			const isValidSize = dogInfo.size !== "";
			return isValidName && isValidSize;
		};

		if (!dogInfo.dogName.trim() || !dogInfo.size) {
			alert("이름과 사이즈는 필수 입력 사항입니다.");
			return;
		}
		if (!isValid(dogInfo)) {
			alert("이름은 한글이나 영어만 사용 가능합니다");
			return;
		}

		const etc = {
			northern: dogInfo.etc.northern ? 1 : 0,
			brachycephalic: dogInfo.etc.brachycephalic ? 1 : 0,
			seniorOrJunior: dogInfo.etc.seniorOrJunior ? 1 : 0,
		};
		const transformDogInfo = {
			...dogInfo,
			etc,
		};
		try {
			const action = mode === "edit" ? editMyPuppy : createMyPuppy;
			const response = await dispatch(action(transformDogInfo));

			if (action.fulfilled.match(response)) {
				alert(mode === "edit" ? "반려견 정보가 수정되었습니다." : "반려견 정보가 생성되었습니다.");
				navigate("/profile/mypuppy/view");
			}
		} catch (error) {
			console.log("error: ", error);
		}
	};

	return (
		<div>
			<FormContainer onSubmit={handleSubmit}>
				<Wrapper>
					<h3>
						반려견 이름
						<span>*필수사항</span>
					</h3>
					<label htmlFor={DogFormController.dogName.label}>
						<Input
							type={DogFormController.dogName.type}
							name={DogFormController.dogName.name}
							id={DogFormController.dogName.label}
							value={dogInfo.dogName}
							onChange={handleChange}
							placeholder={DogFormController.dogName.placeholder}
						/>
					</label>
				</Wrapper>
				<Wrapper>
					<h3>
						반려견 사이즈
						<span>*필수사항</span>
					</h3>
					<div className="options">
						{DogFormController.size.options.map((option) => (
							<div key={option.value}>
								<Input
									type="radio"
									name="size"
									id={option.value}
									value={option.value}
									onChange={handleChange}
									checked={dogInfo.size === option.value}
									labelContent={option.label}
									disabled={mode === "view"} // 조회 모드일 때 비활성화
								/>
							</div>
						))}
					</div>
				</Wrapper>
				<Wrapper>
					<h3>기타 (중복선택 가능)</h3>
					<div className="options">
						{DogFormController.etc.options.map((option) => (
							<div key={option.value}>
								<Input
									type="checkbox"
									name="etc"
									id={option.value}
									value={option.value}
									onChange={handleChange}
									checked={dogInfo.etc[option.value]}
									labelContent={option.label}
									disabled={mode === "view"} // 조회 모드일 때 비활성화
								/>
							</div>
						))}
					</div>
				</Wrapper>
				{mode === "view" ? (
					<Link to="/profile/mypuppy/edit">
						<Button size="md" variant="confirmBtn">
							수정하기
						</Button>
					</Link>
				) : (
					<Button type="submit" size="md" variant="confirmBtn">
						"완료"
					</Button>
				)}
			</FormContainer>
		</div>
	);
};

export default EditMyPuppy;

// 기타 -> 북방견 -1 | 단두종 +1 | 6개월미만 or 노령견 +1

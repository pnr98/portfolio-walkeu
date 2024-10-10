import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import AuthLayout from "../../components/layout/AuthLayout";
import { registerUser } from "../../store/auth-slice";

const Container = styled.div`
	display: flex;
`;
const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 20px;
	.input-wrapper {
		display: flex;
		flex-direction: column;
		label {
			display: block;
			margin-bottom: 5px;
		}
	}
`;

const ErrorMessage = styled.div`
	margin-top: 5px;
	color: red;
	font-size: 14px;
	word-wrap: break-word;
`;
const registerFormControls = [
	{
		name: "nickname",
		label: "닉네임",
		placeholder: "닉네임을 입력해주세요",
		componentType: "input",
		type: "text",
	},
	{
		name: "email",
		label: "이메일",
		placeholder: "이메일을 입력해주세요",
		componentType: "input",
		type: "email",
	},
	{
		name: "password",
		label: "비밀번호",
		placeholder: "비밀번호를 입력해주세요",
		componentType: "input",
		type: "password",
	},
	{
		name: "confirmPassword",
		label: "비밀번호 확인",
		placeholder: "비밀번호 확인을 위해 재입력해주세요",
		componentType: "input",
		type: "password",
	},
];

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [formData, setFormDate] = useState({
		nickname: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormDate({
			...formData,
			[name]: value,
		});
		// 입력값이 변경될 때마다 해당 필드의 에러를 초기화
		setErrors((preErrors) => ({
			...preErrors,
			[name]: undefined,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newErrors = {};

		// 유효성 검사 좀더 추가! 각각 다 채워야함.
		if (!formData.nickname) {
			newErrors.nickname = "닉네임을 입력하세요.";
		}
		if (!formData.email.includes("@")) {
			newErrors.email = "올바른 이메일 형식을 입력하세요.";
		}
		if (formData.password.length < 8) {
			newErrors.password = "비밀번호는 8자리이상, 영어, 숫자, 특수문자의 조합으로 만들어주세요.";
		}
		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
		}
		//
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		} else {
			// 에러가 없으면 서버에 제출
			try {
				const newFormData = {
					nickname: formData.nickname,
					email: formData.email,
					password: formData.password,
				};
				// redux 사용
				const response = await dispatch(registerUser(newFormData));
				console.log("Response:", response);
				// action 객체를 반환함. --> fullfilled 또는 rejected상태로 확인해야함
				if (registerUser.fulfilled.match(response)) {
					console.log("회원가입 성공:", response.payload);
					navigate("/login");
				} else if (registerUser.rejected.match(response)) {
					newErrors.email = "이미 가입된 이메일입니다.";
					setErrors(newErrors);
				}
			} catch (error) {
				console.log("회원가입 실패 - 예외 발생:", error);
				newErrors.server = "서버 오류가 발생했습니다.";
				setErrors(newErrors);
			}
		}
	};

	return (
		<Container>
			<AuthLayout
				title="회원가입"
				children1={
					<StyledForm onSubmit={handleSubmit}>
						{registerFormControls.map((controlItem) => (
							<div key={controlItem.name} className="input-wrapper">
								<label htmlFor={controlItem.name}>{controlItem.label}</label>
								<Input
									name={controlItem.name}
									placeholder={controlItem.placeholder}
									id={controlItem.name}
									type={controlItem.type}
									value={formData[controlItem.name]}
									onChange={handleChange}
									error={errors[controlItem.name]}
									variant="authInput"
								></Input>
								{errors[controlItem.name] && <ErrorMessage>{errors[controlItem.name]}</ErrorMessage>}
							</div>
						))}
						<Button
							type="submit"
							size="md"
							variant="authBtn"
							authType="primary"
							// disabled={!isFormValid}
						>
							회원가입
						</Button>
						{errors["server"] && <ErrorMessage>{errors["server"]}</ErrorMessage>}
					</StyledForm>
				}
				children2={
					<>
						<h1>Welcome to register</h1>
						<p>계정이 있으신가요?</p>
						<Link to="/login">
							<Button size="sm" variant="authBtn" authType="secondary">
								로그인
							</Button>
						</Link>
					</>
				}
			></AuthLayout>
		</Container>
	);
};

export default Register;

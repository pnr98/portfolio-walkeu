import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import AuthLayout from "../../components/layout/AuthLayout";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { loginUser } from "../../store/auth-slice/index";

const Container = styled.div`
	display: flex;
`;
const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 100%;
	.input-wrapper {
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
const loginFormControls = [
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
];

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [formData, setFormDate] = useState({
		email: "",
		password: "",
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

		// 유효성 검사
		if (!formData.email.includes("@")) {
			newErrors.email = "올바른 이메일 형식을 입력하세요.";
		}
		if (!formData.password.trim()) {
			newErrors.password = "비밀번호를 입력해주세요";
		}
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		} else {
			try {
				const newFormData = {
					email: formData.email || "",
					password: formData.password || "",
				};
				const response = await dispatch(loginUser(newFormData));
				if (loginUser.fulfilled.match(response)) {
					console.log("로그인 성공. token: ", response.payload);
					localStorage.setItem("accessToken", response.payload.accessToken);
					navigate("/");
				} else if (loginUser.rejected.match(response)) {
					console.log(response);
					const { message } = response.payload;
					if (message === "User not exist") {
						newErrors.email = "가입되지 않은 이메일입니다.";
						setErrors(newErrors);
					} else if (message === "password not match") {
						newErrors.password = "비밀번호가 일치하지 않습니다.";
						setErrors(newErrors);
					}
				}
			} catch (error) {
				newErrors.server = "서버 오류가 발생했습니다.";
				setErrors(newErrors);
			}
		}
	};

	return (
		<Container>
			<AuthLayout
				title="로그인"
				children1={
					<StyledForm onSubmit={handleSubmit}>
						{loginFormControls.map((controlItem) => (
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
							로그인
						</Button>
					</StyledForm>
				}
				children2={
					<>
						<h1>Welcome to login</h1>
						<p>계정이 없으신가요?</p>
						<Link to="/register">
							<Button size="sm" variant="authBtn" authType="secondary">
								회원가입
							</Button>
						</Link>
					</>
				}
			></AuthLayout>
		</Container>
	);
};

export default Login;

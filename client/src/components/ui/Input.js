import React from "react";
import styled, { css } from "styled-components";

const StyledInput = styled.input`
	// 텍스트 스타일링3
	border-radius: 15px;
	border: 2px solid var(--border);
	padding: 10px 20px;
	transition: background-color 0.1s ease;

	&::placeholder {
		color: #abb4bd;
	}

	&:hover,
	&:focus {
		border-color: var(--blue-30);
	}
	${(props) => props.variant && VARIANT[props.variant]};
	${(props) =>
		props.error &&
		css`
			border: 1px solid red;
		`}
`;

const StyledCheckbox = styled.label`
	// 체크박스 + 텍스트 정렬 맞추기
	display: inline-flex;
	align-items: center;
	gap: 12px;
	cursor: pointer;

	input {
		display: none;
	}
	// 체크박스 스타일링
	span {
		display: inline-block;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		border: 1px solid var(--black-10);
		text-align: center;
		transition: border-color 0.25s ease;
		position: relative;
	}

	// 체크박스/라디오 버튼이 선택된 경우 스타일
	input:checked + span {
		/* background-color: var(--black-20); */
		border-color: var(--black-20);
	}
	// 선택된 상태의 체크표시
	input:checked + span::after {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		content: "";
		width: 50%;
		height: 50%;
		border-radius: 50%;
		background-color: var(--black-20);
	}
`;

const VARIANT = {
	authInput: css`
		border: none;
		border-radius: 50px;
		background-color: rgb(0 0 0 / 5%);
		&::placeholder {
			color: #abb4bd;
		}
		&:hover,
		&:focus {
			background-color: rgba(0, 0, 0, 0.07);
		}
		/* ${(props) =>
			props.error &&
			css`
				border: 2px solid red;
			`} */
	`,
};

const Input = ({ type, name, id, value, onChange, placeholder, checked, labelContent, ...props }) => {
	return (
		<>
			{type === "checkbox" || type === "radio" ? (
				<StyledCheckbox htmlFor={id}>
					<input
						type={type}
						name={name}
						id={id}
						value={value}
						onChange={onChange}
						placeholder={placeholder}
						checked={type === "checkbox" || type === "radio" ? checked : undefined}
						{...props}
					/>
					<span />
					{labelContent}
				</StyledCheckbox>
			) : (
				<StyledInput
					type={type}
					name={name}
					id={id}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					checked={type === "checkbox" || type === "radio" ? checked : undefined}
					{...props}
				/>
			)}
		</>
	);
};

export default Input;

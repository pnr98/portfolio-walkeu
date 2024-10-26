import React from "react";
import styled, { css } from "styled-components";

const StyledInput = styled.input`
	/* border-radius: 50px;
	background-color: rgb(0 0 0 / 5%); */
	border: 2px solid var(--border);
	padding: 10px 20px;
	transition: background-color 0.1s ease;
	&:hover {
		border-color: var(--black-30);
	}
	${(props) => props.variant && VARIANT[props.variant]};
	${(props) =>
		props.error &&
		css`
			border: 1px solid red;
		`}
`;

const VARIANT = {
	authInput: css`
		border: none;
		border-radius: 50px;
		background-color: rgb(0 0 0 / 5%);
		&::placeholder {
			color: #abb4bd;
		}
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

const Input = ({ type, name, id, value, onChange, placeholder, ...props }) => {
	return (
		<StyledInput
			type={type}
			name={name}
			id={id}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			{...props}
		/>
	);
};

export default Input;

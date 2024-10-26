import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
	border: 1px solid transparent;
	position: relative;
	cursor: pointer;
	padding: 10px 14px;
	transition: background-color 0.1s ease;

	/* 폰트사이즈 */
	${(props) => props.size && SIZES[props.size]}
	/* 색상 */
    ${(props) => props.variant && VARIANT[props.variant]}
    // active
    ${(props) =>
		props.isActive &&
		css`
			background: var(--black-30);
			box-shadow: 0px 0px 20px 1px var(--pink-20);
			z-index: 2;
			color: var(--pink-20);
			&:hover {
				background: var(--black-30);
				box-shadow: 0px 0px 20px 1px var(--pink-20);
			}
		`}
`;

const SIZES = {
	sm: css`
		font-size: 14px;
		font-weight: 500;
		padding: 8px 10px;
	`,
	md: css`
		font-size: 16px;
		font-weight: 500;
	`,
	lg: css`
		font-size: 20px;
		font-weight: 700;
	`,
};
const VARIANT = {
	navBtn: css`
		border: none;
		background: var(--white);
		border-radius: 15px;
		padding: 12px 16px;
		/* &:hover {
            background: var(--pink);
        } */
	`,
	authBtn: css`
		border-radius: 50px;
		${(props) =>
			props.authType === "primary" &&
			css`
				background: linear-gradient(to right, #f2a99c, #ff416c);
				&:hover {
					border: 1px solid #ff416c;
					background: var(--white);
					color: var(--black-30);
				}
			`}
		${(props) =>
			props.authType === "secondary" &&
			css`
				border: 1px solid var(--white);
				&:hover {
					background-color: var(--white);
					color: var(--black-30);
				}
			`}
	`,
	confirmBtn: css`
		border: none;
		background: var(--pink-10);
		border-radius: 15px;
		padding: 12px 16px;
		&:hover {
			background: var(--pink-20);
		}
	`,
	cancleBtn: css`
		border: none;
		background: var(--pink-10);
		border-radius: 15px;
		padding: 12px 16px;
		&:hover {
			background: var(--pink-20);
		}
	`,
};

const Button = ({ size, variant, children, onClick, isActive, authType }) => {
	return (
		<StyledButton size={size} variant={variant} onClick={onClick} isActive={isActive} authType={authType}>
			{children}
		</StyledButton>
	);
};

export default Button;

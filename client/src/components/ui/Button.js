import React from 'react';
import styled, { css } from 'styled-components';


const StyledButton = styled.button`
    border: none;
    position: relative;
    cursor: pointer;
    padding: 10px 14px;
    transition: background-color 0.1s ease;
    
    /* 폰트사이즈 */
    ${(props) => props.size && SIZES[props.size]}
    /* 색상 */
    ${(props) => props.variant && VARIANT[props.variant]}
    // active
    ${(props) => props.isActive && css`
        background: var(--black-20);
        box-shadow: 0px 0px 20px 1px var(--pink-20); 
        z-index: 2;
        color: var(--pink-20);
        &:hover {
            background: var(--black-20);
            box-shadow: 0px 0px 20px 1px var(--pink-20);   
        }
    `}
`

const SIZES = {
    sm: css`
        font-size: 14px;
        font-weight: 500;
    `,
    md: css`
        font-size: 16px;
        font-weight: 500;
    `,
    lg: css`
        font-size: 20px;
        font-weight: 700;
    `
}
const VARIANT = {
    navBtn: css`
        background: var(--white);
        border-radius: 15px;
        padding: 12px 16px;
        /* &:hover {
            background: var(--pink);
        } */
    `,
}

const Button = ({size, variant, children, onClick, isActive}) => {
    return (
        <StyledButton size={size} variant={variant} onClick={onClick} isActive={isActive}>
            {children}
        </StyledButton>
    );
};

export default Button;
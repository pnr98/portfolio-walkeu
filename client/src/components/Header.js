import { useState } from "react";
import styled from "styled-components";

import { FiLogIn, FiLogOut } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import Button from "./ui/Button";

const Container = styled.div`
    background-color: var(--white);
    border-radius: 40px;
    height: 100%;
    width: 80px;
    box-shadow: 10px 10px 20px var(--shadow-10);

    display: flex;
    justify-content: center;
`

const StyledIcon = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    
    /* align-items: center;
    align-content: center; */
    svg {
        color: var(--black-20);
        font-size: 30px;
    }
`


const Header = () => {
    const [isUser, setIsUser] = useState(false);

    return (
        <Container>
            {isUser ? (
                <StyledIcon>
                    <RxHamburgerMenu className="icon"/>
                    <FiLogOut className="icon"/>
                </StyledIcon>
            ) : (
                <StyledIcon>
                    <Button>
                        <FiUser className="icon"/>
                    </Button>
                </StyledIcon>
            )}
            
        </Container>
    );
};

export default Header;
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    :root {
        --pink-10:#F4E5F9;
        --pink-20:#fdd9ff;
        --shadow-10: #231f2014;
        --purple: #dcafff;
        --blue-10:#E0E8F7;
        --blue-20:#c8dbff;
        --blue-30:#a2c2ff;

        --yellow:#FFF8FB;
        --white: #ffffff;
        --black-30:#444444;
        --black-20: #6c6c6c;
        --black-10:#b0b0b0;
        --border:#ECECEC;

        --grey-10: #f7f7f7;
        --grey-20: #e7e7e7;
        --grade-blue: #32a1ff;
        --grade-green: #00c73c;
        --grade-orange: #fda60e;
        --grade-red: #cd3534;

        --table-border: #c8dbff70;
        --box-shadow: 2px 20px 50px 0px rgba(145, 192, 255, 0.3),
		inset -1px -1px 20px 0px rgba(145, 192, 255, 0.4),
		inset 0px 11px 28px 0px rgb(255, 255, 255);
        
    }

    * {
        margin: 0;
        padding: 0;
        border: 0;
        box-sizing: border-box;
    }

    body {
        min-height : 100vh;
        width: 100vw;
        font-family: 'Pretendard-Regular', 'Noto Sans KR', 'Roboto', sans-serif;
        color: var(--black-30);
        
    }

    a {
        text-decoration: none;
        color: inherit;
    }
    
    ol, ul {
        list-style: none;
    }

    button {
        font-family: inherit;
        color: inherit;
        background: transparent;
    }
    input {
        all: unset; 
        
    }

    @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
    @font-face {
        font-family: 'SUIT-Regular';
        src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
    }

`;

export default GlobalStyles;

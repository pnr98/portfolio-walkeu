import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        min-height : 100vh;
        width: 100vw;
        font-family: 'Pretendard-Regular', 'Noto Sans KR', 'Roboto', sans-serif;
    }

    a {
        text-decoration: none;
    }
    
    ol, ul {
        list-style: none;
    }

    @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    }
    @font-face {
    font-family: 'SUIT-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
    }

`

export default GlobalStyles;
import * as styled from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyles = styled.createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    background-color: #8c7ae6;
    // display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none !important;
    cursor: pointer;
    border-width: 2px;
    border-style: solid; /* 테두리 스타일 추가 */
    border-color: black; /* 테두리 색상 추가 */
    width: 32px;
    height: 32px;
    font-weight: bold;
    background-color: #fff;
    
  }
`;

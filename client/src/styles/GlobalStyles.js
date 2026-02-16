import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${props => props.theme.fonts.main};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${props => props.theme.colors.secondary};
    }
  }

  input, textarea {
    padding: 10px;
    border: 1px solid ${props => props.theme.colors.lightBrown};
    border-radius: 5px;
    margin-bottom: 10px;
  }
`;

export default GlobalStyles;
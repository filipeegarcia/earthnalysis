import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
 *{
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}
body{
  -webkit-font-smoothing: antialiased;
}
body,input, button, textarea {
  font: 400 1rem 'Roboto', sans-serif;
}
button{
  cursor: pointer;
}

.react-modal-overlay{
  background: rgba(0, 0 , 0, 0.5);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 15;
}
.react-modal-content{
  margin: 1rem 2rem;
  width: 100%;
  max-width: 576px;
  background: #fff;
  padding: 3rem;
  position: relative;
  border-radius: 0.5rem;
  z-index: 11;
}
.react-modal-close {
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  border:0;
  background: transparent;
  transition: filter 0.2s;
  &:hover{
    filter: brightness(0.8);
  }
}
`
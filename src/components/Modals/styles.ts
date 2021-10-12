import styled from 'styled-components';

export const Container = styled.form`
 display: flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 padding: 1rem;

 footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
 }

 button {
    width: 10rem;
    padding: 0 1.5rem;
    height: 4rem;
    font-weight: 600;
    border: 0;
    border-radius: 0.5rem;
    font-size: 1rem;
    margin-top: 1.5rem;
    transition: filter 0.2s;
    &:hover{
      filter: brightness(0.9);
    }
  }

  .multi-select{
    width: 100%;
    padding: 1rem;
  }

  .error-label {
    color: red;
    font-size: 0.8rem;
  }
`;

export const ChartSelector = styled.div`
  margin: 1rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  background-color: #fff;

  img {
    width: 10rem;
    height: 10rem;
    border-radius: 1rem;
  }

`

import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: center;
  gap: 2rem;

  div.label-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      border: 1px solid rgba(0, 0, 0, 0.08);
      width: 100%;
      text-align: center;
    }
  }

  button.add-button {
    height: 10rem;
    width: 10rem;
    color: #000;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 0.5rem;
    margin: 0 5rem;
  }
`;

import styled from "styled-components";

export const Container = styled.div`
   padding: 1.5rem;
   border-bottom: 1px solid #e2e2e2;
`
export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

    > img {
      max-height: 8rem;
      border-radius: 999px;
    }

    > p {
      margin-left: 8rem;
      font-size: 5rem;
    }
`
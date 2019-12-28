import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  background: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Form = styled.form`
  margin-top: 40px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #e0e0e0;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 14px;
  }

  input:focus {
    border: 1px solid #00bcd4;
    box-shadow: 0px 0px 8px 0px #00bcd4;
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: "submit",
  disabled: props.loading === "true",
}))`
  ${props => console.log(Boolean(props.loading))}
  background: #01579b;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  outline: inherit;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    background: #bdbdbd;
    cursor: not-allowed;
  }

  ${props =>
    props.loading === "true" &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #00bcd4;
    }
  }
`;

export const Link = styled.a`
  color: #01579b;
  text-decoration: none;
`;

import React from "react";
import styled from "styled-components";

const Buttons = styled.button`
  font-size: 2.4rem;
  color: #fff;
  font-weight: 700;
  width: 100%;
  background: #595958;
  border: 1px dashed black;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover,
  &:focus {
    color: #e64a02;
    background: #292828;
  }
`;

const Button = props => {
  let { title, task } = props;
  return (
    <Buttons className="button" onClick={task}>
      {title}
    </Buttons>
  );
};

export default Button;

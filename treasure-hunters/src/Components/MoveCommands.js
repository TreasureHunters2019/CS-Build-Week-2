import React, {useState } from "react";
import styled from "styled-components";

const CommandStyles = styled.div`
  width: 100%;
  background: #1c1b1b;
  height: 60px;
  display: flex;
  align-items: center;
  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

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

const MoveCommands = (props) =>{

    return (
      <CommandStyles>
        <div className="buttons">
          <Buttons onClick={() => props.move("n")}>N</Buttons>
          <Buttons onClick={() => props.move("s")}>S</Buttons>
          <Buttons onClick={() => props.move("e")}>E</Buttons>
          <Buttons onClick={() => props.move("w")}>W</Buttons>
          <Buttons onClick={() => props.getStatus()}>Status</Buttons>
        </div>
      </CommandStyles>
    );
  }

export default MoveCommands;


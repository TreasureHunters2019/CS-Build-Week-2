import React, {useState } from "react";
import styled from "styled-components";
import Axios from "axios";

const toRoom = require("../HelpFunctions/MoveTo")
// const dfs = require('../HelpFunctions/MoveTo')

const CommandStyles = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  margin-top: 20px;
`;

const Buttons = styled.button`
  font-size: 1rem;
  color: #fff;
  font-weight: 700;
  width: 4rem;
  background: #595958;
  border: 1px solid black;
  border-radius: 10%;
  height: 4rem;
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

const MoveCommands = ({move, getStatus, roomId}) =>{
  const [Room, setRoom] = useState()
  // console.log(roomId);
  // console.log(Room);
  
  const submit = (e) =>{
    e.preventDefault();
    toRoom(roomId, Room)
  }

  const handleChange = (e) => {
    e.preventDefault();
    setRoom(
      e.target.value
    );
  };
  
    return (
      <CommandStyles>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Buttons onClick={() => move("n")}>N</Buttons>

          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Buttons onClick={() => move("w")}>W</Buttons>
            <div style={{ margin: "1rem" }}>
            <Buttons onClick={() => getStatus()}>Status</Buttons>
            </div>
          <Buttons onClick={() => move("e")}>E</Buttons>
          </div>

          <Buttons onClick={() => move("s")}>S</Buttons>
        </div>

        <div style={{ marginTop: "20px" }}>
            <form onSubmit={submit}>
                <input
                    type="text"
                    name="Room"
                    placeholder = "enter a desired room"
                    onChange = {handleChange}
                    value = {Room}
                />
                <button onClick={() => submit}>Submit</button>
            </form>
        </div>
      </CommandStyles>
    );
  }

export default MoveCommands;


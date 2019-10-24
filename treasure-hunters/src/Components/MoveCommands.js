import React, {useState } from "react";
import styled from "styled-components";
import Axios from "axios";

const toRoom = require("../HelpFunctions/MoveTo")
// const dfs = require('../HelpFunctions/MoveTo')

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

const MoveCommands = ({move, getStatus}) =>{
  const [Examine, setExamine] = useState()

  const submit = (e) =>{
    e.preventDefault();
    Axios.post("https://lambda-treasure-hunt.herokuapp.com/api/adv/examine/",{name: `${Examine}`})
    .then(res => {
      console.log(res.data.description);
      // alert(res.data.description)
    })
  }

  const handleChange = (e) => {
    e.preventDefault();
    setExamine(
      e.target.value
    );
  };
    return (
      <CommandStyles>
        <div className="buttons">
          <Buttons onClick={() => move("n")}>N</Buttons>
          <Buttons onClick={() => move("s")}>S</Buttons>
          <Buttons onClick={() => move("e")}>E</Buttons>
          <Buttons onClick={() => move("w")}>W</Buttons>
          <Buttons onClick={() => getStatus()}>Status</Buttons>
        </div>
        <div>
            <form onSubmit={submit}>
                <input
                    type="text"
                    name="Examine"
                    placeholder = "enter what to examine"
                    onChange = {handleChange}
                    value = {Examine}
                />
                <button onClick={() => submit}>submit</button>
            </form>
        </div>
      </CommandStyles>
    );
  }

export default MoveCommands;


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

const MoveCommands = ({move, getStatus}) =>{

  const [Examine, setExamine] = useState()
  const [Take, setTake] = useState()
  const [Drop, setDrop] = useState()
  const [Sell, setSell] = useState()

//Examine
  const examine = (e) =>{
    e.preventDefault();
    Axios.post("https://lambda-treasure-hunt.herokuapp.com/api/adv/examine/",{name: `${Examine}`})
    .then(res => {
      console.log(res.data.description);
      // alert(res.data.description)
    })
  }
  const handleChangeExamine = (e) => {
    e.preventDefault();
    setExamine(
      e.target.value
    );
  };

//Take
  const take = (e) =>{
    e.preventDefault();
    Axios.post("https://lambda-treasure-hunt.herokuapp.com/api/adv/take/",{name: `${Take}`})
    .then(res => {
      console.log(res.data);
      // alert(res.data.description)
    })
  }
  const handleChangeTake = (e) => {
    e.preventDefault();
    setTake(
      e.target.value
    );
  };

//Drop
  const drop = (e) =>{
    e.preventDefault();
    Axios.post("https://lambda-treasure-hunt.herokuapp.com/api/adv/drop/",{name: `${Drop}`})
    .then(res => {
      console.log(res.data);
      // alert(res.data.description)
    })
  }
  const handleChangeDrop = (e) => {
    e.preventDefault();
    setDrop(
      e.target.value
    );
  };

//Sell
  const sell = (e) =>{
    e.preventDefault();
    Axios.post("https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/",{name: `${Sell}`})
    .then(res => {
      console.log(res.data);
      let yes = prompt(res.data.messages, 'yes');
      if(yes === "yes"){
        setTimeout(() => {
          Axios.post("https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/",{name: `${Sell}`, confirm: "yes"})
          .then(res => {
            alert(res.data.messages)
          })
        }, 2000);
      } else {
        alert("you change your mind what the heck\n move I have a business to run\n I do not have time for games")
      }
      
    })
  }
  const handleChangeSell = (e) => {
    e.preventDefault();
    setSell(
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
            <form style={{ margin: "10px" }} onSubmit={examine}>
                <input
                    type="text"
                    name="Examine"
                    placeholder = "enter what to examine"
                    onChange = {handleChangeExamine}
                    value = {Examine}
                />
                <button style={{ marginLeft: "20px", width: "75px" }} onClick={() => examine}>Examine</button>
            </form>
            <form style={{ margin: "10px" }} onSubmit={take}>
                <input
                    type="text"
                    name="Examine"
                    placeholder = "enter what to pick up"
                    onChange = {handleChangeTake}
                    value = {Take}
                />
                <button style={{ marginLeft: "20px", width: "75px"  }} onClick={() => take}>Take</button>
            </form>
            <form style={{ margin: "10px" }} onSubmit={drop}>
                <input
                    type="text"
                    name="Examine"
                    placeholder = "enter what item to drop"
                    onChange = {handleChangeDrop}
                    value = {Drop}
                />
                <button style={{ marginLeft: "20px", width: "75px"  }} onClick={() => drop}>Drop</button>
            </form>
            <form style={{ margin: "10px" }} onSubmit={sell}>
                <input
                    type="text"
                    name="Examine"
                    placeholder = "enter what to sell"
                    onChange = {handleChangeSell}
                    value = {Sell}
                />
                <button style={{ marginLeft: "20px", width: "75px"  }} onClick={() => sell}>Sell</button>
            </form>
        </div>
      </CommandStyles>
    );
  }

export default MoveCommands;


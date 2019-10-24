import React, { useState, useEffect }from 'react';
import axios from "axios";
import NavBar from "./Components/NavBar";
import Commands from "./Components/MoveCommands";
import Info from "./Components/Info";
import Map from "./Components/Map";

import { CssBaseline } from "@material-ui/core";
import "./App.css";

require("dotenv").config();

export const App = () => {
  const baseURL = "https://lambda-treasure-hunt.herokuapp.com/api/"
  const init_room = {
    room_id: 0,
    description: "",
    messages: [],
    terrain: "",
    title: "",
    elevation: 0,
    coordinates: "",
    items: [],
    cooldown: 5,
    players: [],
    exits: []
  }
  const init_player = {
    name: "",
    speed: 0,
    strength: 0,
    inventory: [],
    encumbrance: 0,
    messages: [],
    gold: 0
  }
  const [room, setRoom] = useState(init_room)
  const [player, setPlayer] = useState(init_player)
  const [currentRoom, setCurrentRoom] = useState()
  const [roomId, setRoomId] = useState()

  const api_key = process.env.REACT_APP_APIKEY;
  const data = {}
  axios.interceptors.request.use(
    options => {options.headers.authorization = `Token ${api_key}`
    return options},
    error => {return Promise.reject(error)}
    )
    
// to get the init
  useEffect(() => {
    axios
    .get(baseURL + "adv/init/")
    .then(res => {
      console.log('this is the init data', res.data);
      let room_id = res.data.room_id;
      let exits = res.data.exits;
      let description = res.data.description;
      let items = res.data.items;
      let messages = res.data.messages;
      let terrain = res.data.terrain;
      let title = res.data.title;
      let elevation = res.data.elevation;
      let coordinates = res.data.coordinates;
      let coolDown = res.data.cooldown;
      let players = res.data.players;
      
      setRoom ({
        room_id: room_id,
        exits: exits,
        description: description,
        items: items,
        messages: messages,
        terrain: terrain,
        title: title,
        elevation: elevation,
        coordinates: coordinates,
        cooldown: coolDown,
        players: players
      })
      setCurrentRoom({
        room_id: room_id,
        exits: exits,
        description: description,
        items: items,
        messages: messages,
        terrain: terrain,
        title: title,
        elevation: elevation,
        coordinates: coordinates,
        cooldown: coolDown,
        players: players
      })
      setRoomId(
        room_id
      )
    })
    .catch(
      err => console.log("Error getting initial room data", err)
      );

    setTimeout(() => {
      axios
      .post(baseURL + 'adv/status/', data)
      .then(res => {
        console.log('this the the status from init', res.data);
        let playerName = res.data.name;
        let speed = res.data.speed;
        let strength = res.data.strength;
        let inventory = res.data.inventory;
        let encumbrance = res.data.encumbrance;
        let messages = res.data.messages;
        let gold = res.data.gold;
        
        setPlayer({
          name: playerName,
          speed: speed,
          strength: strength,
          inventory: inventory,
          encumbrance: encumbrance,
          messages: messages,
          gold: gold
        })
      })
      .catch(
        err => console.log("Error getting initial status", err)
      )
    }, room.cooldown * 1000);
  }, [])

//Get Status
  const getStatus = () => {
      axios
      .post(baseURL + "adv/status/")
      .then(res => {
        console.log("this is the get status data", res.data);
        let playerName = res.data.name;
        let speed = res.data.speed;
        let strength = res.data.strength;
        let inventory = res.data.inventory;
        let encumbrance = res.data.encumbrance;
        let messages = res.data.messages;
        let gold = res.data.gold;
        
        setPlayer({
          name: playerName,
          speed: speed,
          strength: strength,
          inventory: inventory,
          encumbrance: encumbrance,
          messages: messages,
          gold: gold
        })
      })
      .catch(err => console.log("Error getting initial Room data with status", err.message));

      setTimeout(() => {
        axios
          .post(
            baseURL + "adv/status/"
          )
          .then(res => {
            let playerName = res.data.name;
            let speed = res.data.speed;
            let strength = res.data.strength;
            let inventory = res.data.inventory;
            let encumbrance = res.data.encumbrance;
            let messages = res.data.messages;
            let gold = res.data.gold;
            
            setPlayer({
              name: playerName,
              speed: speed,
              strength: strength,
              inventory: inventory,
              encumbrance: encumbrance,
              messages: messages,
              gold: gold
            })
      })
      .catch(err => console.log("Error in the status function", err.message))
    }, room.cooldown * 1000);
  }

//for the move
  const move = dir => {
    const body = JSON.stringify({
      direction: dir
    });

    setTimeout(() => {
      axios
        .post(
          baseURL + "adv/move/",
          body
        )
        .then(res => {
          let room_id = res.data.room_id;
          let exits = res.data.exits;
          let description = res.data.description;
          let items = res.data.items;
          let messages = res.data.messages;
          let terrain = res.data.terrain;
          let title = res.data.title;
          let elevation = res.data.elevation;
          let coordinates = res.data.coordinates;
          let coolDown = res.data.cooldown;
          
            setRoom ({
              room_id: room_id,
              exits: exits,
              description: description,
              items: items,
              messages: messages,
              terrain: terrain,
              title: title,
              elevation: elevation,
              coordinates: coordinates,
              cooldown: coolDown
            })
          })
        .catch(err => {
          console.log("Error while moving", err);
        });
      },room.cooldown*500);
  };

  return (
    <div className="App">
      <CssBaseline />
      <NavBar currentRoom={currentRoom}/>
      <Info player={player} room={room} />
      <Commands move={move} getStatus={getStatus} roomId={roomId}/> 
      <Map currentRoom={room.room_id} />
    </div>
  );
}

export default App;
import React, { useState, useEffect }from 'react';
import { withRouter } from "react-router";
import axios from "axios";
import NavBar from "./Components/NavBar";
import Commands from "./Components/MoveCommands";
import Info from "./Components/Info";
import Map from "./Components/Map";

import { CssBaseline } from "@material-ui/core";
import "./App.css";

require("dotenv").config();

const App = () => {
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
  const [graph, setGraph] = useState({})
  const [lastRoom, setLastRoom] = useState(null)

  const api_key = process.env.REACT_APP_APIKEY;
  const data = {}
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${api_key}`
    }
  }
  // console.log(options)
  
// to get the init
  useEffect(() => {
    axios
    .get(baseURL + "adv/init/", options)
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
    })
    .catch(
      err => console.log("Error getting initial room data", err)
      );

    setTimeout(() => {
      axios
      .post(baseURL + 'adv/status/', data, options)
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
          name:playerName,
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
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${process.env.API_KEY}`
        }
      };
      axios
      .get(baseURL + "adv/init/", options)
      .then(res => {
        console.log("this is the get status data", res.data);
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
        
        setRoom({
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
      })
      .catch(err => console.log("Error getting initial Room data with status", err));

      setTimeout(() => {
        axios
          .post(
            baseURL + "adv/status/",
            options
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
      .catch(err => console.log("Error in the status function", err))
    }, room.cooldown * 1000);
  }

//for the move
  const move = dir => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${api_key}`
      }
    };
    const body = JSON.stringify({
      direction: dir
    });

    setTimeout(() => {
      axios
        .post(
          baseURL + "adv/move/",
          body,
          options
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
      <NavBar />
      <Info player={player} room={room} />
      <Commands move={move} getStatus={getStatus} /> 
      <Map currentRoom={room.room_id} />
    </div>
  );
}

export default App;

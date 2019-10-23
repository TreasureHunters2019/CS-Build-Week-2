require("dotenv").config();
const axios = require("axios");
const move = require("./graph");
var fs = require("fs");

const api_key = process.env.API_KEY;
const options = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${api_key}`
    }
};

// axios
//     .get(
//         "https://lambda-treasure-hunt.herokuapp.com/api/adv/init/",
//         options
//     )
//     .then(res => {
//         console.log("init: ", res.data);

//         // Set the current_room to res.data
//         currentRoom = res.data.room_id;

//         // Print out the current room ID and the exits
//         console.log("Room ID: ", currentRoom.room_id);
//         console.log("Room exits: ", currentRoom.exits);

//         // Set the cool down period to whatever it is in the current room
//         coolDown = currentRoom.cooldown;
//     })
//     .catch(err => console.error(err));

const toRoom = (current_room_id, target_room_id) => {
    const directions = move(current_room_id, target_room_id);
    console.log(
        "The directions to get to where you're going are: ",
        directions
    );
};

toRoom(467, 55)


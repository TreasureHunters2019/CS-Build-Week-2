require("dotenv").config();
const axios = require("axios");
const move = require("./graph");
const map = require("./map");

const api_key = process.env.API_KEY;
const options = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${api_key}`
    }
};

// currentRoom=null
// // give me the CURRENT ROOM
// axios
// .get(
//     "https://lambda-treasure-hunt.herokuapp.com/api/adv/init/",
//     options
// )
// .then(res => {
//     console.log("INIT: ", res.data);

//     // Set the current_room to res.data
//     currentRoom = res.data;

//     // Print out the current room ID
//     console.log("Room ID: ", currentRoom.room_id);

//     // Set the cool down period to whatever it is in the current room
//     coolDown = currentRoom.cooldown;
// })
// .catch(err => console.error(err));

// const current_room_id = currentRoom.room_id

const toRoom = (current_room_id, target_room_id) => {
    const directions = move(current_room_id, target_room_id);
    return directions
};

toRoom(194, 55)

async function targetRoom = (target_room_id) => {
           
    // get path to target
    path_to_target = toRoom(194, target_room_id)    
    console.log('PATH TO TARGET', path_to_target)

    // for each ROOM ID in path_to_target 
    // move from current room to ROOM ID 
    path_to_target.forEach( direction => { 
        // move function
            setTimeout(() => {
                axios
                    .post("https://lambda-treasure-hunt.herokuapp.com/api/adv/move/", { direction: direction }, options)
                    .then(res => {
                        console.log(res.data);
                        // path_to_target.remove(path_to_target[0])
                    })
                    .catch(err => console.log("Error while attempting to traverse: ", err.message));
            }, 16000);
    });

};

targetRoom(55)
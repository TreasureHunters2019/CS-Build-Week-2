require("dotenv").config();
const axios = require("axios");
const move = require("./graph");
var fs = require("fs");


const toRoom = (current_room_id, target_room_id) => {
    const directions = move(current_room_id, target_room_id);
    console.log(
        "The directions to get to where you're going are: ",
        directions
    );
    return directions;
};

toRoom(55, 423)
[s,w,e,w,s,w,e].length 
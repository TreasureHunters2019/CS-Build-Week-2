require("dotenv").config();
const axios = require("axios");
const move = require("./graph");
var fs = require("fs");

const moves = [];
const api_key = process.env.API_KEY;
axios.interceptors.request.use(
    options => {options.headers.authorization = `Token ${api_key}`
    return options},
    error => {return Promise.reject(error)}
)

const toRoom = (current_room_id, target_room_id) => {
    const directions = move(current_room_id, target_room_id);
    console.log(
        "The directions to get to where you're going are: ",
        directions
    );
    directions.forEach(move => {
        moves.push(move)
    })
    // return makeMoves();
};

const makeMoves = () => {
    if(moves.length > 0){
        axios
        .post(
            "https://lambda-treasure-hunt.herokuapp.com/api/adv/move/",
            {direction: moves[0][0], next_room_id: moves[0][1]})
            .then(res => {
                console.log("you have moved a room");
                console.log('this is the new cooldown \n', res.data.cooldown);
                const coolDown = res.data.cooldown
                moves.splice(0,1)
                console.log('here are the moves\n',moves);
                console.log('this is the next move\n', moves[0]);
                setTimeout(() => {
                    makeMoves()
                }, coolDown*1000);
            })
            .catch(err => {console.log('Error moving to the next room', err);})
        } else {
            console.log("you have arrived");
        }
    }

toRoom(194, 55)


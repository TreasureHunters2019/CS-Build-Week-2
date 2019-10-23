import toRoom from './Helpers';

currentRoom=null

// give me the CURRENT ROOM
axios
.get(
    "https://lambda-treasure-hunt.herokuapp.com/api/adv/init/",
    options
)
.then(res => {
    console.log("INIT: ", res.data);

    // Set the current_room to res.data
    currentRoom = res.data;

    // Print out the current room ID
    console.log("Room ID: ", currentRoom.room_id);

    // Set the cool down period to whatever it is in the current room
    coolDown = currentRoom.cooldown;
})
.catch(err => console.error(err));


const targetRoom = (target_room_id) => {
           
    // get path to target
    path_to_target = toRoom(currentRoom.room_id, target_room_id)     

    // traverse from CURRENT ROOM to TARGET ROOM
    // for each ROOM ID in path_to_target 
    // move from current room to ROOM ID 
    path_to_target.forEach( direction => {
        // move function
        setTimeout(() => {
            axios
                .post("https://lambda-treasure-hunt.herokuapp.com/api/adv/move/", { direction: direction }, options)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => console.log("Error while attempting to traverse: ", err.message));
        }, coolDown * 1000);
    });
    // return target room info
    console.log(currentRoom);
    // return current inventory
    axios
    .post("https://lambda-treasure-hunt.herokuapp.com/api/adv/status/", options)
    .then(res => {
        console.log("Current inventory:", res.data.inventory);
    })
    .catch(err => {
        console.log(err.message)
    });
};

targetRoom(1)
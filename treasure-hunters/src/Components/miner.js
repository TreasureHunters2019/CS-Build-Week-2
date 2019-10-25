require("dotenv").config();
const axios = require("axios");
const Hashes = require("jshashes");
const utf8 = require("utf8");

const api_key = process.env.API_KEY;
axios.interceptors.request.use(
    options => {options.headers.authorization = `Token ${api_key}`
    return options},
    error => {return Promise.reject(error)}
)
const get_last = () => {
    console.log("trigger");
    axios
    .get("https://lambda-treasure-hunt.herokuapp.com/api/bc/last_proof")
    .then(res => {
        console.log('this is the last proof \n', res.data.proof);
        // get_proof(res.data.proof)
    })
    .catch(err => {"error getting the last proof \n", err.message})
}

function get_proof(last_proof) {
    let proof = Math.floor(Math.random() * 1000000);
    // const last_proof = 7233826;
    // const difficulty = 6;
    let str = `${last_proof}${proof}`;
    let hash = new Hashes.SHA256().hex(str);

    while (hash.slice(0, 6) !== "000000") {
        proof+=6;
        let str = `${last_proof}${proof}`;
        str = utf8.encode(str);
        hash = new Hashes.SHA256().hex(str);
    }

    console.log(proof);
    return hash;
}

// add last proof and run it 
get_proof(667121562);

//the axios for last proof
//get_last();
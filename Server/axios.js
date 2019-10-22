require("dotenv").config();
const axios = require("axios");

const api_key = process_env.REACT_APP_APIKEY
module.exports = axios.create({
    baseURL: "https://lambda-treasure-hunt.herokuapp.com/api/adv/",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${api_key}`
    }
});

// module.exports = axios.create({
//     baseURL: "localhost:8000/api/adv/",
//     headers: {
//         Authorization: `Token ${process.env.TEST_API_KEY}`
//     }
// });

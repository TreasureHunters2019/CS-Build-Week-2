var sha256 = require('js-sha256');

//TODO: Install npm package here: https://github.com/emn178/js-sha256

const mine = (last_proof) => {

    

    let newProof = Math.floor(Math.random() * 1000000);
    let guess = "";
    let result = "";

    do {
        newProof++
        guess = '${last_proof}${new_proof}';
        result = sha256(guess);
    } 
    while (result.slice(0,6) != "0000000");

    console.log(newProof);
    return newProof;

}
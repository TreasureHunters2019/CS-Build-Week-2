const Hashes = require("jshashes");
const utf8 = require("utf8");

function get_proof(last_proof) {
    let proof = Math.floor(Math.random() * 1000000);
    let str = `${last_proof}${proof}`
    let hash = new Hashes.SHA256().hex(str);

    while (hash.slice(0, 6) !== "000000") {
        proof++;
        let str = `${last_proof}${proof}`
        str = utf8.encode(str);
        hash = new Hashes.SHA256().hex(str);
    }

    console.log(proof);
    return hash;
}

get_proof(4242)


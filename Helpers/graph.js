const map = require("./map");

const dfs = (current_room_id, target_room_id) => {
    // Return a list containing a path from
    // current_room_id to target_room_id in
    // depth-first order.

    // Create a stack
    const stack = [];

    // And enqueue the path to the starting point
    stack.push([current_room_id]);

    // Like before, create a set for visited room
    let visited = {};

    while (stack.length) {
        var path = stack.pop();

        // Get the last node in the path
        var node = path[path.length - 1];

        // Check if the room has been visited or not
        if (!visited[node]) {
            visited[node] = true;

            // Check if it is the destination vertex
            if (node === target_room_id) {
                return path;
            }

            Object.values(map[node]).forEach(neighbor => {
                var copy_path = [...path];
                copy_path.push(Number(neighbor));
                stack.push(copy_path);
            });
        }
    }
};

const move = (current_room_id, target_room_id) => {
    const steps = dfs(current_room_id, target_room_id);
    const directions = [];
    for (let i = 0; i < steps.length; i++) {
        Object.keys(map[steps[i]]).forEach(key => {
            if (steps[i + 1] === map[steps[i]][key]) {
                directions.push([key, steps[i + 1]]);
            }
        });
    }
    return directions;
};

move(55, 377)

module.exports = move;
// module.exports = dfs;


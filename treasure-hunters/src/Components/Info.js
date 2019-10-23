import React from "react";

const Info = props => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
                textAlign: "left"
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                    paddingLeft: "20px"
                }}
            >
                <h2>Room Information</h2>
                <div>
                    <strong>Room Title: </strong>
                    <span>{props.room.title}</span>
                </div>
                <div>
                    <strong>Current Room: </strong>
                    <span>{props.room.room_id}</span>
                </div>
                <div>
                    <strong>Description: </strong>
                    <span>{props.room.description}</span>
                </div>
                <div>
                    <strong>Exits:</strong>
                    
                        <ul>
                            {props.room.exits.map(exit => (
                                <li>{exit}</li>
                            ))}
                        </ul>
                    
                </div>
                <div>
                    <strong>Terrain: </strong>
                    <span>{props.room.terrain}</span>
                </div>
                <span>
                    <strong>Elevation: </strong>
                    <span>{props.room.elevation}</span>
                </span>
                <div>
                    <strong>Current Cooldown: </strong>
                    <span>{props.room.cooldown}</span>
                </div>
                <div>
                    <strong>Items:</strong>
                    <ul>
                        {props.room.items.map(item => (
                            <li>{item}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <strong>Players:</strong>
                    {props.room.players === 0 ? (
                        <p>There are no other people here.</p>
                    ) : (
                        <ul>
                            {props.room.players ? (props.room.players.map(person => (
                                <li>{person}</li>
                            ))):(<p>There are no other people here.</p>)}
                        </ul>
                    )}
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                    paddingLeft: "20px"
                }}
            >
                <h2>Player Information</h2>
                <div>
                    <strong>Name: </strong>
                    <span>{props.player.name}</span>
                </div>
                <div>
                    <strong>Speed: </strong>
                    <span>{props.player.speed}</span>
                </div>
                <div>
                    <strong>Strength: </strong>
                    <span>{props.player.strength}</span>
                </div>
                <span>
                    <strong>Inventory: </strong>
                    {props.player.inventory < 1 ? (
                        <p>There is nothing in your inventory.</p>
                    ) : (
                        <ul>
                            {props.player.inventory.map(item => (
                                <li>{item}</li>
                            ))}
                        </ul>
                    )}
                </span>
                <div>
                    <strong>Encumberance: </strong>
                    <span>{props.player.encumbrance}</span>
                </div>
                <div>
                    <strong>Gold: </strong>
                    <span>{props.player.gold}</span>
                </div>
                <div>
                    <strong>Messages:</strong>
                    {props.player.messages < 1 ? (
                        <p>There are no messages.</p>
                    ) : (
                        <ul>
                            {props.player.messages.map(message => (
                                <li>{message}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Info;

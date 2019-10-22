import React, { useState, useEffect } from "react";
import { FlexibleXYPlot, LineSeries, MarkSeries } from "react-vis";
import room_data from "../Data/graph.json";
import map_data from "../Data/map_data.json";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
   from {
     opacity: 0
   }
   to {
     opacity: 1
   }
 `;

const StyledMap = styled.div`
    margin: auto;
    width: 75%;
    height: 100%;
    flex: 1;
    padding: 3rem 4rem 2rem 3rem;
    position: relative;
    animation: ${fadeIn} 2s ease-in-out 0.6;
`;

const Map = props => {
    const [links, setLinks] = useState([]);
    const [coordinates, setCoordinates] = useState([]);

    useEffect(() => {
        const newLink = [];
        const newCoord = [];
        // Loop through each room in the room_data object
        for (let room in room_data) {
            let data = room_data[room]; // graph data
            newCoord.push(data);
            //get the adjacent rooms x and y coordinates and display that data
            for (let adjacentRoom in map_data[room]) {
                newLink.push([
                    room_data[room],
                    room_data[map_data[room][adjacentRoom]]
                ]);
            }
        }
        setCoordinates(newCoord);
        setLinks(newLink);
    }, []);

    return (
        <div>
            {(!links.length && !coordinates.length) ? <div>Loading...</div> :
            <StyledMap>
                <FlexibleXYPlot width={1024} height={768}>
                    {/* To display the lines on the map to the next plot point */}
                    {links.map(link => (
                        <LineSeries
                            strokeWidth="6"
                            color="#990000"
                            data={link}
                            key={Math.random() * 100}
                        />
                    ))}
                    {/* Plot the points for the room */}
                    <MarkSeries
                        current={props.currentRoom}
                        strokeWidth={2}
                        opacity="1"
                        size="10"
                        color="#FFD014"
                        data={coordinates}
                        style={{ cursor: "pointer", transition: "all .2s" }}
                    />
                </FlexibleXYPlot>
            </StyledMap>}
        </div>
    );
};

export default Map;

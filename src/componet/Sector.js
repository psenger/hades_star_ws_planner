import React from 'react';
import styled from 'styled-components';

const StyledPath = styled.path`
    fill:rgb(163,45,184);
    fill-opacity:0.57;
    fill-opacity:0;
    stroke:white;
    stroke-width:1px;
`;

const StyledGroup = styled.g`
    fill: none;
    stroke: white;
    stroke-width: 1.95px;
`;

function Sector({ keyIdx, x, y, hydroIdx, rpIdx, gateIdx, onClick }) {
    // const [count, setCount] = useState(0);
    return (
        <StyledGroup transform={`translate(${x} ${y}) matrix(6.12323e-17,-1,1,6.12323e-17,-0.160044,100.136)`}>
            <StyledPath pointerEvents="visiblePoint"
                        d="M50.125,0.169L93.443,25.174L93.443,75.184L50.125,100.19L6.807,75.184L6.807,25.174L50.125,0.169Z"
                        onContextMenu={(e) => {
                            e.preventDefault();
                            return false;
                        }}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // console.log(e.button);
                            switch (e.button) {
                                case 0: // left button
                                    // console.log('left');
                                    break;
                                case 2: // right button
                                    // console.log('right');
                                    onClick({key: keyIdx, x, y, hydroIdx, rpIdx, gateIdx}, e);
                                    break;
                            }
                            return false;
                        }}/>
        </StyledGroup>
    );
}

export default Sector;

import React, {useState} from 'react';
import {bindActionCreators} from 'redux';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Sector from "./Sector";
import {setHydro} from '../actions';
import HydroDialog from "./HydroDialog";
import ContextMenu from "./ContextMenu";
import {pipeline} from "../utils/index";

const StyledSvg = styled.svg`
  cursor: pointer;
  width: 100vw;
  height: 100vh;
`;

const mapStateToProps = function ({gridReducer}) {
    return {
        ...gridReducer
    }
};
const mapDispatchToProps = function (dispatch) {
    return {
        dispatch,
        ...bindActionCreators({
            setHydro
        }, dispatch)
    }
}

/**
 * Use this key in your application by passing it with the key=API_KEY parameter.
 *
 * AIzaSyCA6N-uA0cWPJjnnaBHOB_TMhZEXmsFTEw
 *
 * Restrict your key to prevent unauthorized use in production.
 * PhilipSengerWhiteStarKey
 *
 * https://docs.google.com/spreadsheets/d/1BqHcgB8nokyAbAd8wrsvDOujD2W39SboFaEdQfBPHdo/edit#gid=0
 */
const Grid = ({grid, gridIdx, hydro, rp, gate, setHydro}) => {
    const [showHydroDialog, setShowHydroDialog] = useState(false);
    const [showContextMenu, setContextMenu] = useState(false);

    const [contextMenuCoordinateX, setContextMenuCoordinateX] = useState(0);
    const [contextMenuCoordinateY, setContextMenuCoordinateY] = useState(0);

    const [sectorKey, setSectorKey] = useState('');

    // functions that fire off a state.
    const closeHydroDialogCallBack = () => setShowHydroDialog(false);
    const handleCloseHydroDialog = () => setShowHydroDialog(false);

    // pipeline(()=>setContextMenu(false), ()=>setShowHydroDialog(true) )
    const openHydroDialog = () => pipeline( ()=>setContextMenu(false), ()=>setShowHydroDialog(true)  )()
    const openContextMenu = (key,x,y) => pipeline( ()=>setShowHydroDialog(false),()=>setContextMenu(true), ()=>setContextMenuCoordinateX(x), ()=>setContextMenuCoordinateY(y), ()=>setSectorKey(key))()
    const closeContextMenu = () => pipeline( ()=>setShowHydroDialog(false),()=>setContextMenu(false) )()

    const onClickHandlerSector = function onClickHandler({key, x, y, hydroIdx, rpIdx, gateIdx}, e) {
        openContextMenu(key,e.clientX,e.clientY);
        console.log(
            'Grid Hoc',
            key,
            x,
            y,
            e.clientX,
            e.clientY,
            showContextMenu
        );
    }.bind(this);

    return (
        <React.Fragment>
            <StyledSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700" version="1.1">
                {
                    gridIdx.map((keys) => {
                        return keys.map(key => {
                            const {x, y, hydroIdx, rpIdx, gateIdx} = grid[key];
                            return (<Sector
                                        keyIdx={key}
                                        x={x}
                                        y={y}
                                        hydroIdx={hydroIdx}
                                        rpIdx={rpIdx}
                                        gateIdx={gateIdx}
                                        onClick={onClickHandlerSector}/>);
                        })
                    })
                }
            </StyledSvg>
            {/* https://bbbootstrap.com/snippets/simple-context-menu-42706253 */}

            <ContextMenu show={showContextMenu} x={ contextMenuCoordinateY} y={contextMenuCoordinateX} onCloseCallBack={closeContextMenu}>
                <span onClick={openHydroDialog}>Set Hydro</span>
            </ContextMenu>
            <HydroDialog show={showHydroDialog} closeCallBack={closeHydroDialogCallBack}
                         sectorKey={sectorKey}/>
        </React.Fragment>
    );
}

const GridHoc = connect(
    mapStateToProps,
    mapDispatchToProps
)(Grid);

export default GridHoc;

import {Button, Form, Modal} from "react-bootstrap";
import React, {useEffect, useRef, useState} from 'react';
import {connect} from "react-redux";
import {ActionTypes} from "../actions";

const HydroDialog = ({show,closeCallBack,sectorKey,setHydro}) => {
    // const [show, setShow] = useState(true);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [inputValue, setInputValue] = useState()

    return (
        <Modal show={show} onHide={closeCallBack}>
            <Modal.Header closeButton>
                <Modal.Title>Hydro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicHydro">
                       <Form.Control type="text" onChange={({target:{value}})=>{
                           console.log('value=',value);
                           // setHydro(key, id, hydro)
                        }}/>
                        <Form.Text className="text-muted">
                            Enter the total hydro for this sector {sectorKey}
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeCallBack}>
                    Close
                </Button>
                <Button variant="primary" onClick={closeCallBack}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
const mapStateToProps = (state, ownProps) => {

}
const mapDispatchToProps = (dispatch) => {
    return {
        setHydro: (key, id, hydro) => dispatch({ type: ActionTypes.SET_HYDRO, value:{ key, id, hydro } }),
    }
}

const ConnectedHydroDialog = connect(
    // mapStateToProps,
    null,
    mapDispatchToProps
)(HydroDialog);

export default ConnectedHydroDialog;

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function NewShip(props) {
    const [manufacturer, setManufacturer] = useState(props.manufacturer ? props.manufacturer : 'none');
    const [ship, setShip] = useState(props.ship ? props.ship : 'none');
    const [name, setName] = useState(props.name ? props.name : '');
    return (
        <Modal show={true} onHide={() => props.close()}>
            <Modal.Header closeButton>
                <Modal.Title>Add new ship</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Control as="select" value={manufacturer} onChange={(event) => setManufacturer(event.target.value)} style={{marginBottom: '1rem'}}>
                    <option disabled={true} value="none">Select manufacturer</option>
                    {props.manufacturers.map((name) => <option key={name} value={name}>{name}</option>)}
                </Form.Control>
                <Form.Control as="select" disabled={manufacturer === 'none'} value={ship} onChange={(event) => setShip(event.target.value)} style={{marginBottom: '1rem'}}>
                    <option disabled={true} value="none">Select ship</option>
                    {props.models.filter(({manufacturer: manu}) => manu.name === manufacturer).map((model) => <option key={model.name} value={model.name}>{model.name}</option>)}
                </Form.Control>
                <Form.Control placeholder="Ship name (optional)" value={name} onChange={(event) => setName(event.target.value)} style={{marginBottom: '1rem'}}/>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.close()}>Close</Button>
                <Button variant="primary" disabled={manufacturer === 'none' || ship === 'none'} onClick={() => props.onSave(ship, name.length > 0 ? name : undefined, props.id)}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    )
}

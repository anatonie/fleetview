import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function NewShip(props) {
    const [manu, setManu] = useState('none');
    const [ship, setShip] = useState('none');
    const [name, setName] = useState('');
    return (
        <Modal show={true} onHide={() => props.close()}>
            <Modal.Header closeButton>
                <Modal.Title>Add new ship</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Modal body text goes here.</p>
                <Form.Control as="select" value={manu} onChange={(event) => setManu(event.target.value)}>
                    <option disabled={true} value="none">Select manufacturer</option>
                    {props.manufacturers.map((name) => <option key={name} value={name}>{name}</option>)}
                </Form.Control>
                <Form.Control as="select" disabled={manu === 'none'} value={ship} onChange={(event) => setShip(event.target.value)}>
                    <option disabled={true} value="none">Select ship</option>
                    {props.models.filter(({manufacturer}) => manufacturer.name === manu).map((model) => <option key={model.name} value={model.name}>{model.name}</option>)}
                </Form.Control>
                <Form.Control placeholder="Ship name (optional)" value={name} onChange={(event) => setName(event.target.value)}/>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.close()}>Close</Button>
                <Button variant="primary" disabled={manu === 'none' || ship === 'none'} onClick={() => props.onSave(ship, name.length > 0 ? name : undefined)}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    )
}

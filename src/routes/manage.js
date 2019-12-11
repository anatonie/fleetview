import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import NewShipModal from '../components/newShip';
import * as OrgFleet from '../utilities/orgFleet';
import { getModels, getManufacturers } from '../utilities/fleetview';

export default function Manage() {
    const [models, setModels] = useState();
    const [fleet, setFleet] = useState();
    const [modalState, setModalState] = useState(false);
    const [manufacturers, setManufacturers] = useState([]);
    useEffect(() => {
        getModels().then((res) => setModels(res)).then(() => setManufacturers(getManufacturers()));
        OrgFleet.listMyShips().then((res) => setFleet(res));
    }, []);
    const loading = !(!!fleet && !!models);
    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <Table responsive size="sm">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Ship</td>
                        <td>Name</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {fleet.map((ship, idx) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{ship.type}</td>
                            <td>{ship.name}</td>
                            <td>
                                <span style={{marginRight: '1rem'}} onClick={() => {
                                    OrgFleet.deleteShip(ship.id).then(() => OrgFleet.listShips()).then((res) => setFleet(res))
                                }}>X</span>
                                <span>U</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {modalState && <NewShipModal
                close={() => setModalState(false)}
                models={models}
                manufacturers={manufacturers}
                onSave={(ship, name) => {
                    setModalState(false);
                    OrgFleet.createShip(ship, name).then(() => OrgFleet.listShips()).then((res) => setFleet(res))
                }}
            />}
            <Button onClick={() => setModalState(true)}>Add new ship</Button>
        </div>
    );
}

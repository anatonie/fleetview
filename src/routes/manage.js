import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import NewShipModal from '../components/newShip';
import * as OrgFleet from '../utilities/orgFleet';
import { getModels, getManufacturers } from '../utilities/fleetview';
import ModelView from '../components/modelView';

const VIEWS = {
    TABLE: 'table',
    MODELS: 'models'
};
export default function Manage() {
    const [view, setView] = useState(VIEWS.TABLE);
    const [models, setModels] = useState();
    const [fleet, setFleet] = useState();
    const [modalState, setModalState] = useState(false);
    const [manufacturers, setManufacturers] = useState([]);
    const [updateShip, setUpdateShip] = useState({});
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
            <div style={{margin: '1rem 0'}}>
                <ButtonGroup>
                    <Button variant={view === VIEWS.TABLE ? 'primary' : 'secondary'} onClick={() => setView(VIEWS.TABLE)}>Table</Button>
                    <Button variant={view === VIEWS.MODELS ? 'primary' : 'secondary'} onClick={() => setView(VIEWS.MODELS)}>Models</Button>
                </ButtonGroup>
                <Button onClick={() => setModalState(true)} style={{float: 'right'}}>Add new ship</Button>
            </div>
            {view === VIEWS.MODELS && <ModelView fleet={fleet} models={models}/>}
            {view === VIEWS.TABLE && <Table responsive size="sm">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Ship</td>
                        <td>Name</td>
                        <td style={{textAlign: 'center'}}>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {fleet.map((ship, idx) => (
                        <tr key={idx} className={idx % 2 ? 'table-active' : undefined}>
                            <td>{idx + 1}</td>
                            <td>{ship.type}</td>
                            <td>{ship.name}</td>
                            <td style={{textAlign: 'center'}}>
                                <span
                                    style={{marginRight: '1rem'}}
                                    onClick={() => OrgFleet
                                        .deleteShip(ship.id)
                                        .then(() => OrgFleet.listShips())
                                        .then((res) => setFleet(res))}
                                >
                                    X
                                </span>
                                <span
                                    onClick={() => {
                                        setUpdateShip({
                                            id: ship.id,
                                            ship: ship.type,
                                            name: ship.name,
                                            manufacturer: models.find((model) => model.name === ship.type).manufacturer.name
                                        });
                                        setModalState(true);
                                    }}
                                >
                                    U
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>}
            {modalState && <NewShipModal
                {...updateShip}
                close={() => setModalState(false)}
                models={models}
                manufacturers={manufacturers}
                onSave={(ship, name, id) => {
                    setModalState(false);
                    if (id) {
                        OrgFleet.updateShip(id, ship, name).then(() => OrgFleet.listMyShips()).then((res) => setFleet(res))
                    } else {
                        OrgFleet.createShip(ship, name).then(() => OrgFleet.listMyShips()).then((res) => setFleet(res))
                    }
                }}
            />}
        </div>
    );
}

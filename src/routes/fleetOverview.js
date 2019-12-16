import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import * as OrgFleet from '../utilities/orgFleet';

export default function FleetOverview() {
    const [fleet, setFleet] = useState();
    useEffect(() => {
        OrgFleet.listShips()
            .then((res) => res.sort((a, b) => a.owner[0].toLowerCase() > b.owner[0].toLowerCase() ? 1 : -1))
            .then((res) => setFleet(res));
    }, []);
    if (!fleet) {
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
                    <td>Owner</td>
                </tr>
                </thead>
                <tbody>
                {fleet.map((ship, idx) => (
                    <tr key={idx} className={idx % 2 ? 'table-active' : undefined}>
                        <td>{idx + 1}</td>
                        <td>{ship.type}</td>
                        <td>{ship.name}</td>
                        <td>{ship.owner}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

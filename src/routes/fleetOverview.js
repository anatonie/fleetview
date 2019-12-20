import React from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';

function FleetOverview(props) {
    const {fleet} = props;
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

export default connect((state) => ({
    fleet: state.fleet,
    fleetSize: (state.fleet ? state.fleet : []).length
}), {})(FleetOverview);

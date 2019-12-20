import React from 'react';
import { connect } from 'react-redux';

import ModelView from '../components/modelView';

function Fleetview(props) {
    const {fleet, models} = props;
    const loading = !(!!fleet && !!models);
    if (loading) {
        return <div>Loading</div>
    }

    return <ModelView fleet={fleet} models={models}/>
};

export default connect((state) => ({
    fleet: state.fleet,
    fleetSize: (state.fleet ? state.fleet : []).length,
    models: state.models
}), {})(Fleetview);

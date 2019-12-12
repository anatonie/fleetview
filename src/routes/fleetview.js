import React, { useEffect, useState } from 'react';

import * as OrgFleet from '../utilities/orgFleet';
import { getModels } from '../utilities/fleetview';
import ModelView from '../components/modelView';

export default function Fleetview() {
    const [models, setModels] = useState();
    const [fleet, setFleet] = useState();

    useEffect(() => {
        getModels().then((res) => setModels(res));
        OrgFleet.listShips().then((res) => setFleet(res));
    }, []);
    const loading = !(!!fleet && !!models);
    if (loading) {
        return <div>Loading</div>
    }

    return <ModelView fleet={fleet} models={models}/>
};

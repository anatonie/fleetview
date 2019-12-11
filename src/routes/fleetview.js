import React, { useEffect, useState } from 'react';

import * as OrgFleet from '../utilities/orgFleet';
import { getModels } from '../utilities/fleetview';

const scale = 2;

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
    return (
        <div>
            <div
                style={{
                    padding: '1rem',
                    maxWidth: '90%',
                    margin: '0 auto'
                }}
            >
                {fleet
                    .map((ship) => ({
                        ship: ship,
                        model: models.find(({name}) => name === ship.type)
                    }))
                    .filter(({model}) => model !== undefined)
                    .sort((a, b) => a.model.length > b.model.length ? -1 : 1)
                    .map(({ship, model}, idx) => (
                        <span
                            key={idx}
                            style={{
                                // display: 'inline-block',
                                float: 'left',
                                width: `calc(${(scale * model.length)}px + 1rem)`,
                                height: `calc(${(scale * model.beam)}px + 1rem)`,
                                verticalAlign: 'middle'
                            }}
                        >
                            <img
                                alt={model.name}
                                src={model.fleetchartImage}
                                style={{
                                    height: (scale * model.length) + 'px',
                                    width: (scale * model.beam) + 'px',
                                    margin: '0.5rem',
                                    transform: 'rotate(90deg) translateX(-' + (scale * model.length) + 'px)',
                                    transformOrigin: 'bottom left'
                                }}
                            />
                        </span>
                    ))}
            </div>
        </div>
    )
};

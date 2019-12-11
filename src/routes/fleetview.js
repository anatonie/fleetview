import React, { useEffect, useState } from 'react';

import * as OrgFleet from '../utilities/orgFleet';
import { getModels } from '../utilities/fleetview';

export default function Fleetview() {
    const [models, setModels] = useState();
    const [fleet, setFleet] = useState();

    let scale = 2;
    const wrapperPadding = 10;
    const maxWidth = window.innerWidth - (4 * wrapperPadding);

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
            <div style={{padding: wrapperPadding + 'px', maxWidth: '90%'}}>
                {fleet
                    .map((ship) => ({
                        ship: ship,
                        model: models.find(({name}) => name === ship.type)
                    }))
                    .filter(({model}) => model !== undefined)
                    .sort((a, b) => a.model.length > b.model.length ? -1 : 1)
                    .map(({ship, model}, idx) => {
                        let width = scale * model.beam;
                        let height = scale * model.length;
                        if (idx === 0 && height > maxWidth) {
                            scale = maxWidth / model.length;
                            width = scale * model.beam;
                            height = scale * model.length;
                        }
                        width = width + 'px';
                        height = height + 'px';
                        return (
                            <span
                                key={idx}
                                style={{
                                    float: 'left',
                                    width: height,
                                    height: width,
                                    verticalAlign: 'middle',
                                    margin: wrapperPadding + 'px'
                                }}
                            >
                            <img
                                alt={model.name}
                                src={model.fleetchartImage}
                                style={{
                                    height,
                                    width,
                                    transform: 'rotate(90deg) translateX(-' + (scale * model.length) + 'px)',
                                    transformOrigin: 'bottom left'
                                }}
                            />
                        </span>
                        )
                    })}
            </div>
        </div>
    )
};

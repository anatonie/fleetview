import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'

const defaultScale = 2.5;

export default function ModelView(props) {
    const [scale, setScale] = useState(defaultScale);
    const [rotate, setRotate] = useState(false);
    const [maxRotateScale, setMaxRotateScale] = useState();
    const [maxNormScale, setMaxNormScale] = useState();

    const {fleet, models} = props;

    const maxScale = rotate && maxRotateScale ? maxRotateScale : (maxNormScale ? maxNormScale : 10);
    const wrapperPadding = 10;
    const maxWidth = (window.innerWidth * .9) - (4 * wrapperPadding);

    const loading = !(!!fleet && !!models);
    if (loading) {
        return <div>Loading</div>
    }
    return (
        <div style={{padding: wrapperPadding + 'px', maxWidth: '90%', margin: '0 auto'}}>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <div>
                    <div style={{display: 'flex'}}>
                        <label style={{marginRight: '0.5rem'}}>Scale</label>
                        <input
                            type="range"
                            className="custom-range"
                            value={scale}
                            onChange={(event) => setScale(event.target.value)}
                            min={0.1}
                            max={maxScale}
                            step={0.1}
                            style={{maxWidth: '10rem'}}
                        />
                    </div>
                    <div style={{display: 'flex'}}>
                        <label style={{marginRight: '0.5rem'}}>Rotate</label>
                        <Form.Check value={rotate} onChange={() => {
                            if (!rotate && scale > maxRotateScale) {
                                setScale(maxRotateScale);
                            } else if (scale > maxNormScale) {
                                setScale(maxNormScale);
                            }
                            setRotate(!rotate);
                        }}/>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'space-around'
                }}
            >
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
                        if (idx === 0 && (!maxRotateScale || ! maxNormScale)) {
                            const horizMaxScale = maxWidth / model.beam;
                            const vertMaxScale = maxWidth / model.length;
                            const currentMaxScale = rotate ? vertMaxScale : horizMaxScale;
                            if (scale > currentMaxScale) {
                                setScale(currentMaxScale);
                            }
                            setMaxNormScale(horizMaxScale);
                            setMaxRotateScale(vertMaxScale);
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
                                    width: rotate ? height : undefined,
                                    height: rotate ? width : undefined,
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
                                    transform: rotate ?
                                        'rotate(90deg) translateX(-' + (scale * model.length) + 'px)' :
                                        'rotate(180deg)',
                                    transformOrigin: rotate ? 'bottom left' : undefined
                                }}
                            />
                        </span>
                        )
                    })}
            </div>
        </div>
    )
};

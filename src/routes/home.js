import React, { useEffect, useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import { getOrgInfo } from '../utilities/orgInfo';

const processText = (text) => (
    text.split('\n').map((line, idx) => <p key={idx}>{line}</p>)
);
export default function Home() {
    const [orgInfo, setOrgInfo] = useState();
    useEffect(() => {
        getOrgInfo().then((info) => setOrgInfo(info));
    }, []);
    if (!orgInfo) {
        return <div>Loading</div>;
    }
    return (
        <div style={{padding: '2rem'}}>
            <div style={{marginBottom: '2rem'}}>{processText(orgInfo.body)}</div>
            <Tabs>
                {Object.keys(orgInfo).filter((key) => key !== 'body').map((key) => (
                    <Tab title={key[0].toUpperCase() + key.substr(1)} eventKey={key} key={key}>
                        <div style={{padding: '2rem'}}>{processText(orgInfo[key])}</div>
                    </Tab>
                ))}
            </Tabs>
        </div>
    )
}
import * as OrgFleet from './orgFleet';
import * as FleetView from './fleetview';
import store from './store';
import { ACTIONS } from './actions';

const initializeStore = () => {
    OrgFleet.listShips()
        .then((fleet) => store.dispatch({type: ACTIONS.SET_FLEET, fleet}));
    OrgFleet.listEvents()
        .then((events) => store.dispatch({type: ACTIONS.SET_EVENTS, events}));
    FleetView.getModels()
        .then((models) => store.dispatch({type: 'setModels', models}))
        .then(() => FleetView.getManufacturers())
        .then((manufacturers) => store.dispatch({type: 'setManufacturers', manufacturers}));
};

export default initializeStore;

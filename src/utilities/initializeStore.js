import * as OrgFleet from './orgFleet';
import * as FleetView from './fleetview';
import store from './store';
import { ACTIONS } from './actions';

const initializeStore = (loggedIn = false) => {
    OrgFleet.listShips()
        .then((fleet) => store.dispatch({type: ACTIONS.SET_FLEET, fleet}));
    OrgFleet.listEvents(loggedIn)
        .then((events) => events.forEach((event) => OrgFleet.getEventSubscribers(event.id)
            .then((subs) => store.dispatch({type: ACTIONS.ADD_EVENT, event: {...event, subs: subs ? subs : []}}))));
    FleetView.getModels()
        .then((models) => store.dispatch({type: 'setModels', models}))
        .then(() => FleetView.getManufacturers())
        .then((manufacturers) => store.dispatch({type: 'setManufacturers', manufacturers}));
};

export default initializeStore;

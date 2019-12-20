import Home from './routes/home';
import Fleetview from './routes/fleetview';
import Manage from './routes/manage';
import FleetOverview from './routes/fleetOverview';
import Events from './routes/events';

export default {
    HOME: {
        hide: true,
        auth: false,
        path: '/',
        title: 'Home',
        component: Home
    },
    FLEETVIEW: {
        auth: false,
        path: '/fleet',
        title: 'Our Fleet',
        component: Fleetview
    },
    MANAGE_FLEET: {
        account: true,
        auth: true,
        path: '/manage',
        title: 'My Fleet',
        component: Manage
    },
    FLEET_OVERVIEW: {
        admin: true,
        account: true,
        path: '/admin/overview',
        title: 'Fleet overview',
        component: FleetOverview
    },
    EVENTS: {
        admin: true,
        path: '/events',
        title: 'Events',
        component: Events
    }
}

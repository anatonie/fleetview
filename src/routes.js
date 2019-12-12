import Home from './routes/home';
import Fleetview from './routes/fleetview';
import Manage from './routes/manage';

export default {
    HOME: {
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
    MANAGE: {
        auth: true,
        path: '/manage',
        title: 'My fleet',
        component: Manage
    }
}

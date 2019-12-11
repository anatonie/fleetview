import Fleetview from './routes/fleetview';
import Manage from './routes/manage';

export default {
    FLEETVIEW: {
        auth: false,
        path: '/',
        title: 'Fleetview',
        component: Fleetview
    },
    MANAGE: {
        auth: true,
        path: '/manage',
        title: 'Manage',
        component: Manage
    }
}

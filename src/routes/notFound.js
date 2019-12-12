import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div>
            <div>Page not found</div>
            <Link to="/">Return home</Link>
        </div>
    );
}

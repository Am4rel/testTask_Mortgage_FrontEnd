import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
    <ul className="navigation">
        <li><NavLink exact to="/"  className="NavLink" activeClassName="NavLink-active">Home</NavLink></li>
        <li><NavLink exact to="/banks"  className="NavLink" activeClassName="NavLink-active">Banks</NavLink></li>
        <li><NavLink to="/banks/add"  className="NavLink"  activeClassName="NavLink-active">Add bank</NavLink></li>
        <li><NavLink to="/calculator"  className="NavLink"  activeClassName="NavLink-active">Mortgage calculator</NavLink></li>
    </ul>
);

export default Navigation;
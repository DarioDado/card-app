import React, { Fragment } from 'react';
import { NavLink } from './NavLink';

const Header = (props) => {

    const renderMenuButtons = () => {
			return (
				<ul className="tabs-wrapper">
					<NavLink to="/cards">My cards</NavLink>
					<NavLink to="/cards/add">Add card to account</NavLink>
				</ul>
			)
    }

    return (
        <Fragment>
			<header className="header-nav">
				<nav className="main-actions nav-tabbed small-tabs nav-top-bar">
					{renderMenuButtons()}
				</nav>
			</header>
        </Fragment>
    )
};

export { Header };

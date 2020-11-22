import { Link } from 'react-router-dom';
import {useLocation} from "react-router-dom";


const NavLink = (props) => {
	let location = useLocation();
	let isActive = location.pathname === props.to;
	let className = isActive ? 'active' : '';

    return (
        <li className={className}><Link {...props}>{props.children}</Link></li>
    )
};

export { NavLink };
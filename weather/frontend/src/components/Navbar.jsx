import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar({ isAuthenticated = false, onLogout }) {
	return (
		<header className="navbar">
			<Link className="navbar__brand" to="/">
				Weather App
			</Link>

			<nav aria-label="Main navigation">
				<NavLink to="/weather">Weather</NavLink>
				{isAuthenticated ? (
					<button type="button" onClick={onLogout}>Logout</button>
				) : (
					<>
						<NavLink to="/login">Login</NavLink>
						<NavLink to="/signup">Sign up</NavLink>
					</>
				)}
			</nav>
		</header>
	);
}

export default Navbar;

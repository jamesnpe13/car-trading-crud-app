import "./Navbar.scss";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import logo from "../images/logo.png";
import hamburger from "../images/hamburger.png";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { SignedInContext } from "../App";

const Navbar = () => {
	const path = useLocation().pathname;
	const [currentPage, setCurrentPage] = useState("");
	const [sidebar, setSidebar] = useState(false);
	const [signedIn, setSignedIn] = useContext(SignedInContext);

	const showSidebar = () => setSidebar(!sidebar);

	useEffect(() => {
		if (path === "/") {
			setCurrentPage("Signin");
		}
		if (path === "/listings") {
			setCurrentPage("Home");
		}
		if (path === "/listings/create") {
			setCurrentPage("CreateList");
		}
		if (path === "/myListings") {
			setCurrentPage("MyListing ");
		}
		if (path === "/search") {
			setCurrentPage("Search");
		}
	}, [path]);

	function handleSignOut() {
		setSignedIn(false);
		window.localStorage.removeItem("active_user");
	}

	return (
		<div className="navbar">
			<img className="logo" src={logo} alt="logo"></img>
			<div className="links-desktop">
				<Link to={"/mylistings"}>
					<p>My Listings</p>
				</Link>
				<Link to={"/account"}>
					<p>Account</p>
				</Link>
				<Link to={"/"} onClick={handleSignOut}>
					<p>Sign Out</p>
				</Link>
				<Link to={"/customer"}>
					<p className="last">Customer Support</p>
				</Link>
			</div>
			{/* <p className="location-text disabled">{currentPage}</p> */}
			<IconContext.Provider value={{ color: "#f3f5f9" }}>
				<img onClick={showSidebar} className="hamburger disabled" src={hamburger} alt="hamburger"></img>

				<nav className={sidebar ? "nav-menu active" : "nav-menu"}>
					<ul className="nav-menu-items" onClick={showSidebar}>
						<li className="navbar-toggle">
							<div className="menu-bars">
								<AiIcons.AiOutlineClose />
							</div>
						</li>

						<li className={"nav-text-b"}>
							<Link to={"/listings"}>Home</Link>
						</li>
						<div className="links-group-1">
							<li className={"nav-text-b"}>
								<Link to={"/mylistings"}>My Listings</Link>
							</li>
							<li className={"nav-text"}>
								<Link to={"/listings"}>View all listings</Link>
							</li>
							<li className={"nav-text"}>
								<Link to={"/listings/create"}>Create listing</Link>
							</li>
						</div>

						<div className="links-group-2">
							<li className={"nav-text-b"}>
								<Link to={"/account"}>Account</Link>
							</li>
							<li className={"nav-text"}>
								<Link to={"/accountsetting"}>Account settings</Link>
							</li>
							<li className={"nav-text"}>
								<Link to={"/transaction"}>Transaction history</Link>
							</li>
							<li className={"nav-text"}>
								<Link to={"/carddetails"}>Card details</Link>
							</li>
						</div>
						<div className="links-group-3">
							<li className={"nav-text-b"}>
								<Link to={"/customer"}>Customer service</Link>
							</li>
						</div>
						<div className="links-group-4">
							<li className={"nav-text-b"}>
								<Link to={"/"} onClick={handleSignOut}>
									Sign out
								</Link>
							</li>
						</div>
						{/* ) */}
						{/* })} */}
					</ul>
				</nav>
			</IconContext.Provider>
		</div>
	);
};

export default Navbar;

import "./Signin.scss";
import { useContext, useEffect, useState } from "react"
import { SignedInContext } from "../App";

export default function Signin() {
	const [signedIn, setSignedIn] = useContext(SignedInContext);
	const [userInput, setUserInput] = useState({});

	// check if user signed in
	useEffect(() => {
		checkActiveUser();
	}, []);

	function checkActiveUser() {
		// check localStorage
		const userIsActive = window.localStorage.getItem("active_user") ? true : false;

		// if userIsActive
		if (userIsActive) {
			setSignedIn(true);
		} else {
			setSignedIn(false);
		}
	}

	// sign in and authenticate
	function handleChangeUsername(e) {
		setUserInput({ ...userInput, username: e.target.value });
	}

	function handleChangePassword(e) {
		setUserInput({ ...userInput, password: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		userAuthenticate();
	}

	async function userAuthenticate() {
		const response = await fetch(`http://localhost:5000/members/signin/${userInput.username}`);
		const data = await response.json();

		// if user does not exist
		if (!data) {
			console.log("Username does not exist");
			return;
		}

		// if user exists check password
		if (userInput.password === data.password) {
			console.log("Access granted");
			saveUserData(data);
			setSignedIn(true);
			return;
		} else {
			console.log("Password incorrect");
			return;
		}
	}

	function saveUserData(data) {
		const { _id, username, display_name } = data;

		const userData = {
			_id: _id,
			username: username,
			display_name: display_name,
		};

		// save to local storage
		window.localStorage.setItem("active_user", JSON.stringify(userData));

		// save to global state
	}

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" placeholder="Username" required={true} onChange={handleChangeUsername} />
			<input type="text" placeholder="Password" required={true} onChange={handleChangePassword} />
			<button type="submit">Sign in</button>
		</form>
	);
}

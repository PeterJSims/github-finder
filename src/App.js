import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

const App = (props) => {
	const [ users, setUsers ] = useState([]);
	const [ user, setUser ] = useState({});
	const [ repos, setRepos ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ alert, setAlert ] = useState(null);

	//Connect api and use global variables to up limit of searches
	useEffect(() => {
		setLoading(true);
		async function fetchData() {
			const res = await axios.get(
				`https://api.github.com/users?client_id=${process.env
					.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
			);
			setLoading(false);
			setUsers(res.data);
		}
		fetchData();
	}, []);

	//Search Github Users
	const searchUsers = async (text) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		setLoading(false);
		setUsers(res.data.items);
	};

	//Get a single user
	const getUser = async (username) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		setLoading(false);
		setUser(res.data);
	};

	//Get user's repos

	const getUserRepos = async (username) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=10&sort=created:asc&client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		setLoading(false);
		setRepos(res.data);
	};

	//Clear users from the state
	const clearUsers = () => {
		setLoading(false);
		setUsers([]);
	};

	//Set alert
	const handleAlert = (message, type) => {
		setAlert({ message, type });

		setTimeout(() => {
			setAlert(null);
		}, 3000);
	};

	return (
		<Router>
			<div className="App">
				<Navbar />
				<div className="container">
					<Alert alert={alert} />
					<Switch>
						<Route
							exact
							path="/"
							render={(props) => (
								<Fragment>
									<Search
										searchUsers={searchUsers}
										clearUsers={clearUsers}
										showClear={users.length > 0 ? true : false}
										setAlert={handleAlert}
									/>
									<Users loading={loading} users={users} />
								</Fragment>
							)}
						/>
						<Route exact path="/about" component={About} />
						<Route
							exact
							path="/user/:login"
							render={(props) => (
								<User
									{...props}
									getUser={getUser}
									getUserRepos={getUserRepos}
									user={user}
									repos={repos}
									loading={loading}
								/>
							)}
						/>
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default App;

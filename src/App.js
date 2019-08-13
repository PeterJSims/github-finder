import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import GithubState from './context/github/GithubState';

import './App.css';

const App = (props) => {
	const [ alert, setAlert ] = useState(null);

	//Connect api and use global variables to up limit of searches
	//ADD BACK IN LATER
	// useEffect(() => {
	// 	setLoading(true);
	// 	async function fetchData() {
	// 		const res = await axios.get(
	// 			`https://api.github.com/users?client_id=${process.env
	// 				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
	// 		);
	// 		setLoading(false);
	// 		setUsers(res.data);
	// 	}
	// 	fetchData();
	// }, []);

	//Get user's repos

	//Set alert
	const handleAlert = (message, type) => {
		setAlert({ message, type });

		setTimeout(() => {
			setAlert(null);
		}, 3000);
	};

	return (
		<GithubState>
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
										<Search setAlert={handleAlert} />
										<Users />
									</Fragment>
								)}
							/>
							<Route exact path="/about" component={About} />
							<Route exact path="/user/:login" component={User} />
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	);
};

export default App;

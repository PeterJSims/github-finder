import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {
	state = {
		users: [],
		user: {},
		loading: false,
		alert: null
	};

	//Connect api and use global variables to up limit of searches
	async componentDidMount() {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process
				.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		this.setState({ loading: false, users: res.data });
	}

	//Search Github Users
	searchUsers = async (text) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		this.setState({ loading: false, users: res.data.items });
	};

	//Get a single user
	getUser = async (username) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		this.setState({ loading: false, user: res.data });
	};

	//Clear users from the state
	clearUsers = () => this.setState({ users: [], loading: false });

	//Set alert
	setAlert = (message, type) => {
		this.setState({ alert: { message, type } });

		setTimeout(() => {
			this.setState({ alert: null });
		}, 3000);
	};

	render() {
		const { users, user, loading } = this.state;
		return (
			<Router>
				<div className="App">
					<Navbar />
					<div className="container">
						<Alert alert={this.state.alert} />
						<Switch>
							<Route
								exact
								path="/"
								render={(props) => (
									<React.Fragment>
										<Search
											searchUsers={this.searchUsers}
											clearUsers={this.clearUsers}
											showClear={users.length > 0 ? true : false}
											setAlert={this.setAlert}
										/>
										<Users loading={loading} users={users} />
									</React.Fragment>
								)}
							/>
							<Route exact path="/about" component={About} />
							<Route
								exact
								path="/user/:login"
								render={(props) => (
									<User {...props} getUser={this.getUser} user={user} loading={loading} />
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;

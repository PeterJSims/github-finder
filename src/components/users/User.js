import React, { Component } from 'react';

class User extends Component {
	componentDidMount() {
		this.props.getUser(this.props.match.params.login);
	}
	render() {
		//Choose the items to pull from user. Add more later if you want.
		const {
			name,
			avatar_url,
			location,
			bio,
			blog,
			login,
			html_url,
			followers,
			following,
			public_repos,
			public_gists,
			hireable
		} = this.props.user;

		const { loading } = this.props;

		return <div>{name}</div>;
	}
}

export default User;

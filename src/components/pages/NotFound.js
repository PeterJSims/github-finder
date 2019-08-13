import React from 'react';
import image from './hqdefault.jpg';
const NotFound = () => {
	return (
		<div>
			<h1>Content Not Found</h1>
			<p className="lead">The page you requested does not exist</p>
			<img src={image} style={{ width: '50%' }} alt="Technical Difficulties" />
		</div>
	);
};

export default NotFound;

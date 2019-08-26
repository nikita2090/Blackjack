import React from 'react';
import PropTypes from 'prop-types';

import styles from './Winner.module.css';


const { wrap, win } = styles;

const Winner = ({ winner }) => {
	let content;
	switch (winner) {
		case 'push':
			content = 'Push';
			break;

		case 'no':
		case '':
		case null:
			content = '';
			break;

		default:
			content = `${upFirstLetter(winner)} wins!`
	}

	return (
		<div className={wrap}>
			<span className={win}>{content}</span>
		</div>
	);
};


const upFirstLetter = (string) => {
	if (!string) return string;
	return string[0].toUpperCase() + string.slice(1)
};


Winner.propTypes = {
	winner: PropTypes.string
};

Winner.defaultProps = {
	winner: ''
};

export default Winner;
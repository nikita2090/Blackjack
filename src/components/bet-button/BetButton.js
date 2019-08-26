import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './BetButton.module.css';


const { btn, btnLeft, btnRight, btnDouble } = styles;

const BetButton = ({ value, name, winner, onClick }) => {
	let specialBtnClass;
	switch (name) {
		case 'minus':
			specialBtnClass = btnLeft;
			break;
		case 'plus':
			specialBtnClass = btnRight;
			break;
		case 'double':
			specialBtnClass = btnDouble;
			break;
		default:
			specialBtnClass = '';
	}

	const btnClass = classNames(specialBtnClass, btn);
	return (
		<button className={btnClass}
		        name={name}
		        disabled={!winner}
		        onClick={onClick}>
			{value}
		</button>
	);
};


BetButton.propTypes = {
	value: PropTypes.string,
	name: PropTypes.string,
	winner: PropTypes.string,
	onClick: PropTypes.func,
};

BetButton.defaultProps = {
	value: '0',
	name: '',
	winner: '',
};

export default BetButton;


import React from 'react';
import classNames from 'classnames';

import styles from './BetButton.module.css';


const { btn, btnLeft, btnRight, btnDouble } = styles;

const BetButton = ({ value, name, onClick, winner }) => {
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
		        onClick={onClick}
		        disabled={!winner}>
			{value}
		</button>
	);
};

export default BetButton;


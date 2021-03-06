import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './ControlButton.module.css';


const { btn, start, stop, hit } = styles;

const ControlButton = ({ name, value, disabled, onClick }) => {
	let specialBtnClass;
	switch (name) {
		case 'start':
			specialBtnClass = start;
			break;
		case 'stop':
			specialBtnClass = stop;
			break;
		case 'hit':
			specialBtnClass = hit;
			break;
		default:
			specialBtnClass = '';
	}

	const btnClass = classNames(specialBtnClass, btn);
	return (
		<button className={btnClass}
		        onClick={onClick}
		        disabled={disabled}>
			{value}
		</button>
	);
};


ControlButton.propTypes = {
	name: PropTypes.string,
	value: PropTypes.string,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
};

ControlButton.defaultProps = {
	name: '',
	value: 'Simple Btn',
	disabled: false,
};

export default ControlButton;


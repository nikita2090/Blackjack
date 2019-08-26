import React from 'react';
import PropTypes from 'prop-types';

import styles from './Points.module.css';


const {wrap, pointsSt} = styles;

const Points = ({ points }) => (
	<div className={wrap}>
		<div className={pointsSt}>POINTS: {points}</div>
	</div>
);


Points.propTypes = {
	points: PropTypes.number
};

PropTypes.defaultProps = {
	points: 0
};

export default Points;
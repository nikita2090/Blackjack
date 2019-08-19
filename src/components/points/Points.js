import React from 'react';

import styles from './Points.module.css';

const {wrap, pointsSt} = styles;

const Points = ({ points }) => (
	<div className={wrap}>
		<div className={pointsSt}>POINTS: {points}</div>
	</div>
);

export default Points;
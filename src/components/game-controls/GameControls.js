import React from 'react';
/*import PropTypes from ''*/

import styles from './GameControls.module.css';


const GameControls = ({winner, start, hit, stop}) => (
	<div>
		{winner && <button onClick={start}>GO</button>}
		{!winner && <button onClick={hit}>HIT</button>}
		{!winner && <button onClick={stop}>STOP</button>}
	</div>
);

export default GameControls;
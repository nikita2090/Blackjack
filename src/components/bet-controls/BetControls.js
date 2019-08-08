import React from 'react';
/*import PropTypes from ''*/

import styles from './BetControls.module.css';


const BetControls = ({ bet, changeBet, deposit, winner }) => (
	<div>
		{winner && <button name='minus' onClick={changeBet}>-</button>}
		<span>Bet:{bet}</span>
		{winner && <button name='plus' onClick={changeBet}>+</button>}
		<button name='double' onClick={changeBet}>x2</button>
		<div>Your deposit:{deposit}</div>
	</div>
);

export default BetControls;
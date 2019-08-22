import React from 'react';
/*import PropTypes from ''*/

import styles from './BetControls.module.css';

import BetButton from '../bet-button/BetButton';


const { wrap, betSt, panel } = styles;

const BetControls = ({ bet, changeBet, winner }) => (
	<div className={wrap}>
		<div className={panel}>
			<BetButton value='-'
			        name='minus'
			        onClick={changeBet}
			        winner={winner}/>

			<div className={betSt}>Bet: {bet}</div>

			<BetButton value='+'
			        name='plus'
			        onClick={changeBet}
			        winner={winner}/>

			<BetButton value='X2'
			        name='double'
			        onClick={changeBet}
			        winner={winner}/>
		</div>
	</div>
);

export default BetControls;